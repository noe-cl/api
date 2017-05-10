import * as mysql from "mysql";
import { Injectable } from "../decorator/injectable";
import { Config } from "../../config/config";
import { Promise } from "es6-promise";
import { IError } from "mysql";


@Injectable
export class MysqlDriver {
    private connection: mysql.IConnection;

    constructor(private config: Config) {
        this.connect();
    }

    private connect(): void {
        if (!this.config.data.testing) {
            this.connection = mysql.createConnection(this.config.data.db);

            this.connection.connect((err) => {
                if (err) {
                    console.log("Config file loaded from : " + this.config.path);
                    console.log(JSON.stringify(this.config.data));
                    throw new Error("Database Connection error : " + err);
                }
            });

            this.connection.on("error", (error: IError) => {
                console.log('DB ERROR', error);
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    this.connect();
                } else {
                    throw error;
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