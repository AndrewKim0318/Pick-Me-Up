Pick Me Up 
=========

## Project Description

- A web app that imitates skip-the-dishes but for a single restaurant

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body-parser
- cookie-session
- express
- env
- node-sass
- morgan
- twilio

## Description

- The main page allows users to place an order (logged in or not) which sends a text to the restaurant and client

- The registration page allows new users to create an account which creates a new user in a users table
  - If a user tries to create a new user with a username that already exists, an error message is shown

- The login page allows previously registered users to log back in to their account
  - If the username doesn't exist, an error message stating username doesn't exist in database is shown
  - If the username exists in the database but the password for the username is incorrect, error stating incorrect password is shown

- Registered users can see their previous order history in their profile

- Registered users can change their phone number and password in their profile page

- There is a search bar by the categories to search for particular options
  - Searching for items that are not any of the option displays "no such item" error



