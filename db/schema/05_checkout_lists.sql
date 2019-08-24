DROP TABLE IF EXISTS checkout_items CASCADE;

CREATE TABLE checkout_items (
  id SERIAL PRIMARY KEY NOT NULL,
  food_item_id INTEGER REFERENCES food_items(id) ON DELETE CASCADE,
  checkout_id INTEGER REFERENCES checkouts(id) ON DELETE CASCADE,
  quantity SMALLINT NOT NULL
  );
