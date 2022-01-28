const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");

// user router
const userRouter = require("./routes/userRoutes");

// config in development environment
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// initialize app
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is movieDB backend.");
});

app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

module.exports = app;
