const app = require("./app")
const connectDB = require("./config/connectDB")

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const PORT = process.env.PORT || 5000

// connect db and start server
const start = () => {
    connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    })
}

start()