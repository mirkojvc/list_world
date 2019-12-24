import User from '../models/User';
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response...";
router.get("/", function(req, res, next) {    res.send(databaseConnection);});
// Connecting to MongoDB
mongoose.connect(
    "mongodb://mongodb:27017/graphql",
    { useNewUrlParser: true, useUnifiedTopology: true}
);
// If there is a connection error send an error message
mongoose.connection.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database" +error;
});
// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
    var user = new User({username: 'pera', password: 'sifra123'});
    user.save();
});
module.exports = router;