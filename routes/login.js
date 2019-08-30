const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;

    const queryString = `
      SELECT *
      FROM users
      WHERE id = $1;
    `;

    const queryParams = [id];

    db.query(queryString, queryParams)
    .then(res => res.rows)
    .then(user => {
      console.log("in users in get request");
      if (user.length) {
        res.redirect('/');
      } else {
        const templateVars = {
          data: user,
          error: false
        }
        res.render('login', templateVars);
      }
    });

  });

  router.post("/", (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    const queryString = `
    SELECT *
    FROM users
    WHERE username = $1
    `;

    const queryParams = [username];

    db.query(queryString, queryParams)
    .then(res => res.rows)
    .then(user => {
      if (user.length) {
       if (bcrypt.compareSync(password, user[0]["password"])){
        req.session.userId = user[0]["id"];
        res.redirect("/");
       } else {
         const templateVars = {
          data: user,
          error: "password"
         }
         res.render("login", templateVars);
       }
    } else {
      templateVars = {
        data: user,
        error: "user"
      }
      res.render("login", templateVars);
    }
    });
  });
  return router;
};
