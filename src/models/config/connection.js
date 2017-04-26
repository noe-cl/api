const mysql = require("mysql");
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/config.json'), 'utf8'));

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if (err) {
        console.log(err);
        process.exit();
    }
});

module.exports = connection;