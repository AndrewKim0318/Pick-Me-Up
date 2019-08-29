const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
    let orderArray = [];
    let orderItemArray = [];
    let orderDateArray = [];
    let totalCostArray = [];
    let formatDateArray =[];

    const id = req.session.userId;

    const userQueryString = `
    SELECT *
    FROM users
    WHERE id = $1
    `;
    const userQueryParams = [id]

    db.query(userQueryString, userQueryParams)
    .then(res => res.rows)
    .then(user => {
      
      if(!user.length) {
        res.redirect("/");
      }
      const orderHistoryQueryString = `
        SELECT checkouts.order_date, checkouts.total_cost, checkout_items.quantity, checkout_items.food_item_id
        FROM checkouts
        JOIN checkout_items ON checkouts.id = checkout_items.checkout_id
        WHERE checkouts.user_id = $1;
      `;
      const orderHistoryQueryParams = [id];

      db.query(orderHistoryQueryString, orderHistoryQueryParams)
      .then(res => {
        if (res.rows.length) {
          return res.rows;
        }
        return null;
      })
      .then(orderHistory => {
        if(orderHistory){

        for ( let i= 0 ; i< orderHistory.length; i++) {

          let orderDate = JSON.stringify(orderHistory[i]["order_date"]);
          let formattedDate = orderDate.replace(/(['"])/g,'').slice(0, 10);
          
          let foodItemQueryString = `
            SELECT item_name
            FROM food_items
            WHERE id = $1
          `
          let foodItemId = orderHistory[i]["food_item_id"];
          let foodItemQueryParams = [foodItemId];
          if (i < (orderHistory.length - 1)){
            db.query(foodItemQueryString, foodItemQueryParams)
            .then(data => data.rows[0])
            .then(foodName => {
              let foodItemName = foodName["item_name"];
  
              if (!orderDateArray.includes(orderDate)) {
                orderDateArray.push(orderDate);
                formatDateArray.push(formattedDate);
                totalCostArray.push(orderHistory[i]["total_cost"]);
                orderItemArray = [];
                orderArray.push(orderItemArray);
                orderItemArray.push(foodItemName);
              } else {
                orderItemArray.push(foodItemName);
              }
              console.log(formatDateArray);
              console.log(totalCostArray);
              console.log(orderArray);
          }) 
          } else {
            db.query(foodItemQueryString, foodItemQueryParams)
            .then(data => data.rows[0])
            .then(foodName => {
              let foodItemName = foodName["item_name"];
  
              if (!orderDateArray.includes(orderDate)) {
                orderDateArray.push(orderDate);
                formatDateArray.push(formattedDate);
                totalCostArray.push(orderHistory[i]["total_cost"]);
                orderItemArray = [];
                orderArray.push(orderItemArray);
                orderItemArray.push(foodItemName);
              } else {
                orderItemArray.push(foodItemName);
              }
              const templateVars = {
                data: user,
                dateArray: formatDateArray,
                costArray: totalCostArray,
                itemArray: orderArray
              }
              console.log("before rendering");
              console.log(formatDateArray);
              console.log(totalCostArray);
              console.log(orderArray);
              res.render('profile', templateVars);
            });
          }
        }
      } 
    })
  });

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

    db.query(queryString, queryParams);

    res.redirect("/profile");
  });
  return router;
};
