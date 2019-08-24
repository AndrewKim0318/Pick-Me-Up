DROP TABLE IF EXISTS checkout_items CASCADE;

CREATE TABLE checkout_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  food_item_id INT REFERENCES food_items(id) ON DELETE CASCADE,
  quantity SMALLINT NOT NULL DEFAULT 0,
  availability BOOLEAN DEFAULT TRUE,
  order_date DATE DEFAULT NOW()
  );
