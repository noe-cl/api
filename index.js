//dependences
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

//path vers les routes
const routePath = path.join(__dirname, "src", "routes");

//configuration d'express
const app = express();
const port = process.argv[2] || 3000;
app.use(bodyParser.json());

//import des routes
const userRoute = require(path.join(routePath, "userRoute"));
const progressRoute = require(path.join(routePath, "progressRoute"));
const roleRoute = require(path.join(routePath, "roleRoute"));
const linkRoute = require(path.join(routePath, "linkRoute"));

//route middleware
app.use("/api/users", userRoute);
app.use("/api/progression", progressRoute);
app.use("/api/roles", roleRoute);
app.use("/api/links", linkRoute);


app.get("/login", (req, res) => {



});


app.get("/me", (req, res) => {

});

//lancement du serveur
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
