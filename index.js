"use strict";
require("dotenv").config();
//instantiate express module here
const express = require("express");
const router = require("./src/routes");
//use express in app variable here
const app = express();
//define the server port here
const PORT = 5000;

// apply middleware
//allow this app to receive incoming json request
//Create app.use for express.json here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//create the homepage route here and inside it create res means, response, and it send string "Hello Express!" to the API
app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));

// Create listen here
app.listen(PORT, () => console.log(`CONECTED : port ${PORT}`));
