const express = require("express")
const bodyParser = require("body-parser")
const todoRoutes = require("./routes/todos")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/todos", todoRoutes)
app.use("/api/user", userRoutes)

module.exports = app
