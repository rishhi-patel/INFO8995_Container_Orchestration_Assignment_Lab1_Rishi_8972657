const fs = require("fs")
const http = require("http")
const morgan = require("morgan")
const app = require("./src/app")
const path = require("path")

// Logging to local file
const logDir = path.join(__dirname, "logs")
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}
const logStream = fs.createWriteStream(path.join(logDir, "access.log"), {
  flags: "a",
})
app.use(morgan("combined", { stream: logStream }))

const PORT = process.env.PORT || 5000

http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
