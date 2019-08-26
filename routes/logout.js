const express = require('express');
const router  = express.Router();
const users   = require("../server");

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
  });
  return router;
};