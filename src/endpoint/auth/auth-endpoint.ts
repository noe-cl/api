import { Endpoint } from "../../core/decorator/endpoint";
import { Post } from "../../core/decorator/post";
import { APIError } from "../../core/api-error";
import * as jwt from "jsonwebtoken";
import { MysqlDriver } from "../../core/db/mysql-driver";
import { Config } from "../../config/config";
import { Promise } from "es6-promise";
import * as sha from "sha256";
/**
 * Created by Miu on 08/05/2017.
 */

@Endpoint({
    route: '/auth'
})
export class AuthEndpoint {

    constructor(private db: MysqlDriver, private config: Config) {
    }

    @Post()
    post(data: any): Promise<{ token: string }> {
        if (data.login === undefined || data.password === undefined) {
            throw new APIError(400, "Bad Request");
        }
        return new Promise<{ token: string }>((resolve) => {
            this.db.query("Select * from users WHERE login = ? AND password = ?", [data.login, sha(data.password)]).then(results => {
                if (results.length === 0) {
                    throw new APIError(400, "Bad credentials.");
                }
                let user = results[0];
                resolve({
                    token: jwt.sign({
                        nickname: user.login,
                        lodestoneId: user.lodestoneId,
                        role: user.id_role
                    }, this.config.data.jwt.secret)
                });
            }).catch(error => {
                throw new APIError(500, error.toString());
            });
        });
    }
}