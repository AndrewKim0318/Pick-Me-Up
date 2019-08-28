const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");


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

    router.post("/order", (req, res) => {
     
      //Taken from stackOverflow
      //stackOverflow url: https://stackoverflow.com/questions/2817646/javascript-split-string-on-space-or-on-quotes-to-array?lq=1
      //The parenthesis in the regex creates a captured group within the quotes
      let myRegexp = /[^\s"]+|"([^"]*)"/gi;
      let foodItemArray = [];

      do {
          //Each call to exec returns the next regex match as an array
          var match = myRegexp.exec(foodItems);
          if (match != null)
          {
              //Index 1 in the array is the captured group if it exists
              //Index 0 is the matched text, which we use if no captured group exists
              foodItemArray.push(match[1] ? match[1] : match[0]);
          }
      } while (match != null);
      // End of script taken from stackOverflow

      const id = req.session.userId;
      let foodItems = req.body.foodItems;
      let foodItemQuantity = req.body.foodItemQuantity;
      let totalCost = req.body.totalCost;
      let foodItemQuantityArray = foodItemQuantity.split(" ");

      console.log(totalCost);
      if(id) {
        let queryString = `
          INSERT INTO checkouts(user_id, total_cost, store_id)
          VALUES ($1, $2, 1);

        `
        let queryParams = [id, totalCost];

        for (let i=0; i< foodItemArray.length; i++) {
          queryString += `
            SELECT id
            FROM food_items
            WHERE name = $1
          `
          
          queryParams = [foodItemArray[i]];

          
          console.log(foodItemArray[i]);
          console.log(foodItemQuantityArray[i]);
        }

        console.log(queryString);
      }
    })

  });
  return router;
}
