const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const { users, foodItems }  = require("./constants");

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("this", this);
    const id = req.session.userId;
    const templateVars = {
      user: users[id],
      fooditems: foodItems
    }
    res.render('homepage', templateVars);
  });
  return router;
};
