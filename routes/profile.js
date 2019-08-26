const express = require('express');
const router  = express.Router();
const users   = require("../server");
const bcrypt  = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    const templateVars = {
      user: users[id]
    }
    
    res.render('profile', templateVars);
  });

  router.post("/edit", (req,res) => {
    const id = req.session.userId;

    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    users[id]["phoneNumber"] = phoneNumber;
    users[id]["password"] = hashedPassword;

    res.redirect("/profile");
  });
  return router;
};
