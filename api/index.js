const express = require("express");
const app = express();

const mongoose = require("mongoose");

require("dotenv").config();

const DB_URL = process.env.DB_URL;

const PORT = 7000;

app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(`Error connecting to the database due to ${err.message}`);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome On Home Back End",
  });
});

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
