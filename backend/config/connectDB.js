const mongoose = require("mongoose");

// connecting to mongo db
module.exports = (url) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log("Database connected successfully");
    });
};
