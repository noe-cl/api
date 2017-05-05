import { MysqlDriver } from '../config/connection';
import { Promise } from "es6-promise";
import { Injectable } from "../../core/decorator/injectable";

@Injectable
export class UserRepository {

    constructor(private db: MysqlDriver) {
    }

    find(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.db.connection.query("SELECT * FROM users;", (error, field, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("ok");
                }
                //console.dir(results);
                //resolve();
            });
        });
    }

    get(id) {

    }

    create(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            console.log("repo");
            this.db.connection.query("INSERT INTO users (lodestoneId,login,password,id_role) VALUES (?,?,?,?)", ["10404168", "erezia", "test", 5], (error, results, field) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                console.dir(results);
                resolve(results)
            });
        });
    }

    update() { }

    delete(id) {

    }
}