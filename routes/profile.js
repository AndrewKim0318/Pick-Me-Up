const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    const userQueryString = `
    SELECT *
    FROM users
    WHERE id = $1
    `;
    const userQueryParams = [id]

    let firstQuery = db.query(userQueryString, userQueryParams)
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
    });

    const orderHistoryQueryString = `
      SELECT checkouts.order_date, checkouts.total_cost, checkout_items.quantity, checkout_items.food_item_id
      FROM checkouts
      JOIN checkout_items ON checkouts.id = checkout_items.checkout_id
      WHERE checkouts.user_id = $1;
    `;
    const orderHistoryQueryParams = [id];

    let secondQuery = db.query(orderHistoryQueryString, orderHistoryQueryParams);

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
