const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "noe",
    password: "lanoevera",
    socketPath: '/var/run/mysqld/mysqld.sock',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        process.exit();
    }
});

module.exports = connection;