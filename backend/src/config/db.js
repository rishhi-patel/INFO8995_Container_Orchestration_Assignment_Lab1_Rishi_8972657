const { Pool } = require("pg")

const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "mydb",
  port: process.env.DB_PORT || 5432,
})

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err.stack))

// Create todos table
pool.query(
  `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
  )
  `,
  (err) => {
    if (err) throw err
    console.log("📋 Todos table ready")
  }
)

// Create users table
pool.query(
  `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `,
  (err) => {
    if (err) throw err
    console.log("📋 Users table ready")
  }
)

module.exports = pool
