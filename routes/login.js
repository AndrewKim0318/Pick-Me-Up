const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const users   = require("../server");

const getIdByUsername = function(database, username) {
  for (let key in database) {
    if (username === database[key]["username"]) {
      return key;
    }
  }
}

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    const templateVars = {
      user: users[id]
    }
  
    if (users[id]) {
      res.redirect('/');
    } else {
      res.render('login', templateVars);
    }
  });

  router.post("/", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const id = getIdByUsername(users, username);

    if (bcrypt.compareSync(password, users[id]["password"])) {
      req.session.userId = id;
      res.redirect("/");
    } 

  });
  return router;
};
