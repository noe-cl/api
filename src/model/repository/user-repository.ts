import { MysqlDriver } from '../config/connection';
import { Promise } from "es6-promise";
import { Injectable } from "../../core/decorator/injectable";
import { Repository } from "../../core/repository";
import { APIError } from "../../core/api-error";
import { User } from "../bean/user";
import { Role } from "../bean/role";
import * as sha from 'sha256';

@Injectable
export class UserRepository implements Repository<User> {

    constructor(private db: MysqlDriver) {
    }

    getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            this.db.connection.query("SELECT * FROM users;", (error, results, field) => {
                if (error) {
                    console.log(error);
                }
                console.dir(results);
                resolve(results);
            });
        });
    }

    get(id: number): Promise<User> {
        return null;
    }

    create(user: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let hashed = sha(user.password);
            this.db.connection.query("INSERT INTO users (lodestoneId,login,password,id_role) VALUES (?,?,?,?)", [user.lodestoneId, user.login, hashed, 5], (error, results, field) => {
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

    update(id: number, user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            let query = "UPDATE users SET ";
            let parameter = [];

            if (user.password) {
                query += "password = ?";
                parameter.push(sha(user.password));
            }
            if (parameter.length > 0) {
                query += " , ";
            }
            if (user.role.id) {
                query += "id_role = ?";
                parameter.push(user.role.id)
            }
            query += " WHERE lodestoneId = ? ;"
            parameter.push(id);

            this.db.connection.query(query, parameter, (error, results, field) => {
                if (error) {
                    reject(error);
                }
                let returnedUser = {} as User;
                returnedUser.lodestoneId = user.lodestoneId;
                returnedUser.login = user.login;
                returnedUser.role = {} as Role;
                returnedUser.role.id = user.role.id;
                resolve(returnedUser);
            });
        });
    }

    delete(id: number): void {

        this.db.connection.query("DELETE FROM users WHERE lodestineId = ? ;", [id], (error, results, field) => {
            if (error) {
                throw new APIError(500, error.message);
            }


        });
    }
}