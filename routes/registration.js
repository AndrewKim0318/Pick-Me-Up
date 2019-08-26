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
    const templateVars = {
      user: users[id]
    }

    if (users[id]) {
      res.redirect('/');
    } else {
      res.render('registration', templateVars);
    }
  });

  router.post("/", (req,res) => {
    const id = generateRandomString();
    const name = req.body.name;
    const username = req.body.username;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    users[id] = {
      id: id,
      name: name,
      username: username,
      phoneNumber: phoneNumber,
      password: hashedPassword
    }

    req.session.userId = id;

    res.redirect("/");
  });
  return router;
};
