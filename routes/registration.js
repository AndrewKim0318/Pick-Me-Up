const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const users  = require("../server");

const generateRandomString = function() {
  let shortURL = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let length = 6;

  for (let i = 0; i < length; i++) {
    let random = Math.random(chars.length);
    let index = Math.floor(random * chars.length);
    shortURL += chars[index];
  }

  return shortURL;
};

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;

const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;

const queryParams = [id]

  db.query(queryString, queryParams)
  .then(res => res.rows)
  .then(user => {
    if (user.length) {
      res.redirect('/');
    } else {
      const templateVars = {
        data: user
    }
      res.render('registration', templateVars);
    }
  })
  });

  router.post("/", (req,res) => {
    // let id = 99;
    const name = req.body.name;
    const username = req.body.username;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const queryString = `
    INSERT INTO users(name, username, phone_number, password, store_id)
    VALUES ($1, $2, $3, $4, 1) RETURNING *
    `

    const queryParams = [name, username, phoneNumber, hashedPassword];
    db.query(queryString, queryParams)
    .then(res => res.rows)
    .then(user => {
      console.log(user);
      req.session.userId = user[0]["id"];
      res.redirect("/");
    })

  });
  return router;
};
