const express = require('express');
const router  = express.Router();
const users   = require("../server");
const bcrypt  = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    const queryString = `
    SELECT *
    FROM users
    WHERE id = $1
    `;
    const queryParams = [id]

    db.query(queryString, queryParams)
    .then(res => res.rows)
    .then(user => {
      if(user.length){
    const templateVars = {
      data: user
    }
    res.render('profile', templateVars);
  } else {
    res.redirect("/");
  }
  })
});

  router.post("/edit", (req,res) => {
    const id = req.session.userId;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const queryString = `
    UPDATE users
    SET phone_number = $1, password = $2
    WHERE id = $3 RETURNING *;
    `;

    const queryParams = [phoneNumber, hashedPassword, id];

    db.query(queryString, queryParams)
    .then(res => {
      console.log(res.rows);
    })
    res.redirect("/profile");
  });
  return router;
};
