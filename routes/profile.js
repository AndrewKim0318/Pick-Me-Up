const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.userId;
    const templateVars = {
      user: users[id]
    }
    
    res.render('profile', templateVars);
  });
  return router;
};
