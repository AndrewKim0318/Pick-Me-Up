const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const { users, foodItems }  = require("./constants");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    
    queryString = `
      SELECT *
      FROM users
      WHERE id = $1;
    `;

    queryParams = [id];

    db.query(queryString, queryParams)
    .then(res => {
      if(res.rows.length > 0){
        return res.rows;
      }
      return null;
    })
    .then(user => {
      const templateVars = {
        user: user,
        foodItems: foodItems
      }
      res.render('homepage', templateVars); 
    });
  });
  return router;
}
