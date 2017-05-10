import * as mysql from "mysql";
import { Injectable } from "../decorator/injectable";
import { Config } from "../../config/config";
import { Promise } from "es6-promise";


@Injectable
export class MysqlDriver {
    private connection: mysql.IConnection;

    constructor(private config: Config) {
        if (!config.data.testing) {
            this.connection = mysql.createConnection(config.data.db);

            this.connection.connect((err) => {
                if (err) {
                    console.log("Config file loaded from : " + config.path);
                    console.log(JSON.stringify(config.data));
                    throw new Error("Database Connection error : " + err);
                }
            });
        }
    }

    public query(sql: string, values: any[] = []): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            console.log("DB QUERY : " + mysql.format(sql, values));
            this.connection.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results)
                }
            });
        });
    }
}