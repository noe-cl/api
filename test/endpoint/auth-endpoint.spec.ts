import { expect } from "chai";
import { Injector } from "../../src/core/injector";
import { MysqlDriver } from "../../src/core/db/mysql-driver";
import { Config } from "../../src/config/config";
import { AuthEndpoint } from "../../src/endpoint/auth/auth-endpoint";
import * as jwt from "jsonwebtoken";
import { MockConfig } from "../mock/config";

class MockDriver extends MysqlDriver {

    public query(sql: string, values: any[]): Promise<any> {
        return Promise.resolve([{lodestoneId: 123456789, login: "FooLogin", id_role: 1}]);
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
            expect(decoded.role).to.eql(1);
        });
    });
});