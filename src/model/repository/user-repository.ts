import { MysqlDriver } from '../config/connection';
import { Promise } from "es6-promise";
import { Injectable } from "../../core/decorator/injectable";

@Injectable
export class UserRepository {

    constructor(private db: MysqlDriver) {
    }

    getAll(): Promise<User> {
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

    get(id: number) {

    }

    create(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.db.connection.query("INSERT INTO users (lodestoneId,login,password,id_role) VALUES (?,?,?,?)", [user.lodestoneId, user.login, "test", 5], (error, results, field) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                console.dir(results);
                let returnedUser = {} as User;
                returnedUser.lodestoneId = user.lodestoneId;
                returnedUser.login = user.login;
                returnedUser.role = {} as Role;
                returnedUser.role.id = 5;
                resolve(returnedUser);
            });
        });
    }

    update(id: number) { }

    delete(id: number) {

    }
}