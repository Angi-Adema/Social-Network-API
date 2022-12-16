//Require the express, mongoose and connection packages.
const express = require("express");
// const mongoose = require('mongoose');
const db = require("./config/connection");
const routes = require("./routes");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// mongoose.connect('mongodb://localhost:27017/social-network-api');

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});