// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const bcrypt     = require("bcrypt");
const sass       = require("node-sass-middleware");
const app        = express();
const cookieSession = require('cookie-session');
const morgan     = require('morgan');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static(__dirname + "/public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const registrationRoutes = require("./routes/registration");
const profileRoutes = require("./routes/profile");
const homepageRoutes = require("./routes/homepage")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));

app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/registration", registrationRoutes(db));
app.use("/profile", profileRoutes(db));
app.use("/", homepageRoutes(db));
// Note: mount other resources here, using the same pattern above

//Create hardcoded db to test registration and login
const users = {
  
};

const food_items = {
  1: {
    name: "scones",
    description: "3 freshly baked blueberry scones",
    price: "8.50",
    category: "pastries"
  },
  2: {
    name: "cookies",
    description: "3 freshly baked blueberry cookies",
    price: "2.50",
    category: "cookies"
  },
  3: {
    name: "cake",
    description: "1 nice cake",
    price: "15.50",
    category: "cakes"
  },
  4: {
    name: "pie",
    description: "1 apple pie",
    price: "12.50",
    category: "pies"
  },
  5: {
    name: "macarons",
    description: "3 mystery flavoured macarons",
    price: "7.50",
    category: "macarons"
  }
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = users;