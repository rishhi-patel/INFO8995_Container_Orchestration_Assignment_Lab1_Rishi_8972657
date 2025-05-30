const { Pool } = require("pg")

const pool = new Pool({
  host: "postgres",
  user: "admin",
  password: "admin",
  database: "mydb",
  port: 5432,
})

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack))

pool.query(
  `
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
  )
  `,
  (err) => {
    if (err) throw err
    console.log("Todos table ready")
  }
)

module.exports = pool
