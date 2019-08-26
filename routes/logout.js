const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session.userId = null;
    res.redirect("/");
  });
  return router;
};