const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const path = require("path")

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

app.use("/api/v1/user", userRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware);

module.exports = app;
