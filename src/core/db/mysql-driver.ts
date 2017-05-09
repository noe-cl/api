import * as mysql from "mysql";
import { Injectable } from "../decorator/injectable";
import { Config } from "../../config/config";
import { APIError } from "../api-error";


@Injectable
export class MysqlDriver {
    private connection: mysql.IConnection;

    constructor(private config: Config) {
        if (!config.data.testing) {
            this.connection = mysql.createConnection(config.data.db);

            this.connection.connect((err) => {
                if (err) {
                    throw new APIError(500, "Database Connection error : " + err);
                }
            });
        }
    }

    public query(sql: string, values: any[] = []): Promise<any> {
        return new Promise<any>((resolve, reject) => {
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