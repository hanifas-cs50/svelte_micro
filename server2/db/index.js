const { drizzle } = require("drizzle-orm/better-sqlite3");
const Database = require("better-sqlite3");
const { archive } = require("./schema");

const sqlite = new Database("archive.db");
const db = drizzle(sqlite, { schema: archive });

module.exports = { db, archive };
