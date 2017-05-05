import * as mysql from 'mysql';
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "../../core/decorator/injectable";



@Injectable
export class MysqlDriver {
    connection: mysql.IConnection;
    constructor() {

        const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/config.json'), 'utf8'));

        this.connection = mysql.createConnection(config.db);

        this.connection.connect((err) => {
            if (err) {
                console.log(err);
                process.exit();
            }
        });
    }
}