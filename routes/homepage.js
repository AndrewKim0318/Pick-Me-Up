const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const { users, foodItems }  = require("./constants");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    let queryString;
    let queryParams;

    if (id) {
      queryString = `
        SELECT users.*, food_items.cost, food_items.item_description, food_items.item_name, food_items.category
        FROM users
        JOIN stores ON stores.id = users.store_id
        JOIN food_items ON stores.id = food_items.store_id
        WHERE users.id = $1
      `;

      queryParams = [id];
      db.query(queryString, queryParams)
      .then(res => {
        console.log(res.rows);
        if(res.rows.length > 0){
          return res.rows;
        }
        return null;
      })
      .then(data => {
        console.log("data is:", data);
        const templateVars = {
          data:data
        }
        res.render('homepage', templateVars);
      });
    } else {
      queryString = `
        SELECT food_items.category, food_items.cost, food_items.item_description, food_items.item_name
        FROM food_items
      `;

      queryParams = [];
      db.query(queryString, queryParams)
      .then(res => {
        if(res.rows.length > 0){
          return res.rows;
        }
        return null;
      })
      .then(data => {
        const templateVars = {
          data:data
        }
        res.render('homepage', templateVars);
      });
    }

  });
  return router;
}
