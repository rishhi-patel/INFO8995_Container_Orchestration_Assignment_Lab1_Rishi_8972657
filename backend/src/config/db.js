const { Pool } = require("pg")

const pool = new Pool({
  host: "postgres", // Since you're connecting from your local machine (not inside another container)
  user: "admin", // From your docker-compose `POSTGRES_USER`
  password: "admin", // From your docker-compose `POSTGRES_PASSWORD`
  database: "mydb", // From your docker-compose `POSTGRES_DB`
  port: 5432, // Exposed default PostgreSQL port
})

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack))

module.exports = pool
