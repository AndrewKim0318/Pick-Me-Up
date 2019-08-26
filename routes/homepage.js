const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const users   = require("../server");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    const templateVars = {
      user: users[id]
    }
    res.render('homepage', templateVars);
  });
  return router;
};
