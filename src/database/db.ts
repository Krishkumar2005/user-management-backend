import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error("DB Connection Error:", err.message);
  else console.log("SQLite DB connected");
});

// Initialize table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      age INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;