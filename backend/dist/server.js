"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userRoutes_1 = require("./routes/userRoutes");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var db_1 = require("./db/db");
dotenv.config();
var app = express();
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// db config
app.use('/user', userRoutes_1.userRoute);
var port = process.env.PORT || 3000;
app.listen(port, function () {
    db_1.MongoConnect.connect().then(function (res) { return console.log('db connected'); }).catch(function (err) { return console.log(err); });
    console.log("Server running on " + port);
});
