const express = require("express")
const bodyParser = require("body-parser")
const todoRoutes = require("./routes/todos")
const db = require("./config/db")

const app = express()

app.use(bodyParser.json())
app.use("/todos", todoRoutes)

module.exports = app
