const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
//const passport = require('passport');

const routePath = path.join(__dirname, "src", "routes");

//configuration d'express
const app = express();
const port = process.argv[2] || 3000;

const userRoute = require(path.join(routePath, "userRoute"));
const progressRoute = require(path.join(routePath, "progressRoute"));

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/progression", progressRoute);

app.get("/login", (req, res) => {

});


app.get("/me", (req, res) => {

});


app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
