DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  credit_card_number VARCHAR(255) NOT NULL,
  credit_card_cvs VARCHAR(255) NOT NULL,
  credit_card_exp VARCHAR(255) NOT NULL
  )
