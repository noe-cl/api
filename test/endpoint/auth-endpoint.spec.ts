import { expect } from "chai";
import { Injector } from "../../src/core/injector";
import { MysqlDriver } from "../../src/model/config/connection";
import { IError, IFieldInfo } from "mysql";
import { Config, ConfigModel } from "../../src/config/config";
import { AuthEndpoint } from "../../src/endpoint/auth/auth-endpoint";
import * as jwt from 'jsonwebtoken';
import { User } from "../../src/model/bean/user";
/**
 *  example unit tests
 */

class MockDriver {

    public query = (sql: string, values: any[], callback: (err: IError, results?: any, fields?: IFieldInfo[]) => void): any => {
        callback(null, [{lodestoneId: 123456789, login: "FooLogin"}]);
    }
}

class MockConfig extends Config {
    public get data(): ConfigModel {
        return {
            db: {
                host: "localhost",
                user: "root",
                database: "noe",
                password: "lol",
                port: 3306
            },
            jwt: {
                secret: "OmgI'mSoSecret"
            }
        }
    }
}

Injector.activateTestingMode();
Injector.registerMock(MysqlDriver, MockDriver);
Injector.registerMock(Config, MockConfig);
const endpoint = Injector.instantiate(AuthEndpoint);

describe('AuthEndpoint', () => {

    it('should return valid JWT on successful login.', () => {
        return endpoint.post({login: "FooLogin", password: "whatever"}).then(data => {
            let decoded = jwt.verify(data.token, "OmgI'mSoSecret");
            expect(decoded.nickname).to.eql("FooLogin");
            expect(decoded.lodestoneId).to.eql(123456789);
        });
    });
});