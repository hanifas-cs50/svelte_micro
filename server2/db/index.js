const { drizzle } = require("drizzle-orm/better-sqlite3");
const Database = require("better-sqlite3");
const { cars } = require("./schema");

const sqlite = new Database("logs.db");
const db = drizzle(sqlite, { schema: cars });

module.exports = { db, cars };
