const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const user_router = require("../routes/users/auth");
const users_router = require("../routes/users/usersr");
const updateUser_router = require("../routes/users/updateU");
const deleteUser_router = require("../routes/users/deleteU");
const emptyCart_router = require("../routes/cart/emptyCartr");
const event_router = require("../routes/events/eventsr");
const cart_router = require("../routes/cart/cartr");
const product_router = require("../routes/products/productr");
require("dotenv").config({ path: "./.env" });
// console.log("TOKEN:", process.env.SECRET_KEY);
// console.log("DB_URL:", process.env.DB_URL);
const DB_URL = process.env.DB_URL;
const PORT = 7000;
app.use(express.json());
const allowOrigins = [
  "http://localhost:5173",
  "https://egy-places.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
    }
  },
  credentials: true
}));
console.log(process.env.DB_URL);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(`Error connecting to the database due to ${err.message}`);
  });

app.use("/api/v1/auth", user_router);
app.use("/api/v1/users", users_router);
app.use("/api/v1/users", updateUser_router);
app.use("/api/v1/users", deleteUser_router);
app.use("/api/v1/cart", emptyCart_router);
app.use("/api/v1/events", event_router);
app.use("/api/v1/cart", cart_router);
app.use("/api/v1/products", product_router);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    data: null,
  });
});

app.listen(PORT, (err) => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
