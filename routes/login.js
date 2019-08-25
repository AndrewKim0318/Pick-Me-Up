const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const users   = require("../server");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('login');
  });

  router.post("/", (req,res) => {
    res.redirect("/");
  });
  return router;
};
