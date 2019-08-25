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
    res.render('login');
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
