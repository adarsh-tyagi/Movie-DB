const express = require("express")
const cors = require("cors")

// config in development environment
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path: "backend/config/config.env"})
}

// initialize app
const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is movieDB backend.")
})

module.exports = app