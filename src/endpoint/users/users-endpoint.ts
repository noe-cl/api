import { Endpoint } from "../../core/decorator/endpoint";
import { GetOne } from "../../core/decorator/get-one";
import { Post } from "../../core/decorator/post";
import { Put } from "../../core/decorator/put";
import { Delete } from "../../core/decorator/delete";
import { GetAll } from "../../core/decorator/get-all";

import { UserRepository } from "../../model/repository/user-repository";
import { User } from "../../model/bean/user";
import { Promise } from "es6-promise";
import { ModelChecker } from "../../core/security/model-checker";
import { APIError } from "../../core/api-error";
import { AuthToken } from "../../core/security/auth-token";

import * as sha from "sha256";

@Endpoint({
    route: '/users'
})
export class UsersEndpoint {

    constructor(private repo: UserRepository) {
    }

    @GetOne()
    public getOne(id: number): Promise<User> {
        return this.repo.get(id);
    }

    @GetAll()
    public getAll(): Promise<User[]> {
        return this.repo.getAll();
    }

    @Post()
    public post(body: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            if (ModelChecker.hasProperties(body, ['login', 'password', 'lodestoneId'])) {
                body.password = sha(body.password);
                this.repo.create(body).then(user => {
                    delete user.password;
                    resolve(user);
                }).catch(reject);
            } else {
                reject(new APIError(400, "Bad Request"));
            }
        });
    }

    @Put(true)
    public put(id: number, body: User, token: AuthToken): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            if (token.role <= 2 || parseInt(token.lodestoneId) === id) {
                if (body.hasOwnProperty('password')) {
                    body.password = sha(body.password);
                }
                this.repo.update(id, body).then(resolve).catch(reject);
            } else {
                reject(new APIError(403, "Forbidden"));
            }
        });
    }

    @Delete(true)
    public delete(id: number, token: AuthToken): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (token.role <= 2 || parseInt(token.lodestoneId) === id) {
                this.repo.delete(id).then(resolve).catch(reject);
            } else {
                reject(new APIError(403, "Forbidden"));
            }
        });
    }

}