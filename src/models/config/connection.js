const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "db",
    user: "root",
    database: "noe",
    password: "lanoevera",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        process.exit();
    }
});

module.exports = connection;