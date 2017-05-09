import * as mysql from 'mysql';
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "../../core/decorator/injectable";
import { Config } from "../../config/config";
import { IQueryFunction } from "mysql";



@Injectable
export class MysqlDriver {
    connection: mysql.IConnection;

    constructor(private config:Config) {

        this.connection = mysql.createConnection(config.data.db);

        this.connection.connect((err) => {
            if (err) {
                console.log(err);
                process.exit();
            }
        });
    }

    public query:IQueryFunction;
}