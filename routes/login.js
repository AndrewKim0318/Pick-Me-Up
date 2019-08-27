const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const users   = require("../server");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
  
    const queryString = `
      SELECT *
      FROM users
      WHERE id = $1;
    `;

    const queryParams = [id];

    db.query(queryString, queryParams)
    .then(res => {
      if(res.rows.length > 0){
        return res.rows;
      }
      return null;
    })
    .then(user => {
      if (user !== null) {
        res.redirect('/');
      } else {
        const templateVars = {
          user: user
        }
        res.render('login', templateVars);
      }
    });

  });

  router.post("/", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const queryString = `
      SELECT *
      FROM users
      WHERE username = $1;
    `;

    const queryParams = [username];

    db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .then(user => {
      if (bcrypt.compareSync(password, user["password"])) {
        return user;
      }
      return null;
    })
    .then(user => {
      if(!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.redirect("/");
    });

  });
  return router;
};
