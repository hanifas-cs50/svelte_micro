const { sqliteTable, text, integer, real } = require("drizzle-orm/sqlite-core");

const archive = sqliteTable("archive", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  cars_id: integer("cars_id").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  price: real("price").notNull(),
});

module.exports = { archive };