/**
 * Created by Miu on 29/04/2017.
 */
import { use, request, expect } from "chai";
import server from "../../src/index";
import { Endpoint } from "../../src/core/decorator/endpoint";
import { AuthToken } from "../../src/core/security/auth-token";
import { GetOne } from "../../src/core/decorator/get-one";
import * as jwt from "jsonwebtoken";
import { Injector } from "../../src/core/injector";
import { Config } from "../../src/config/config";
import { MockConfig } from "../mock/config";

/**
 * Basic tests for the example endpoint, to explain how to test endpoints.
 *
 * THIS IS INTEGRATION TEST EXAMPLE.
 */

@Endpoint({
    route: '/secure',
    secure: true
})
class SecureEndpoint {

    @GetOne()
    getSecure(id: number, token: AuthToken) {
        return token;
    }
}

Injector.activateTestingMode();
Injector.registerMock(Config, MockConfig);

server.router.addEndpoint(SecureEndpoint);

use(require("chai-http"));
describe('Server', () => {

    it('should return json', () => {
        return request(server.app).get('/test')
            .then(res => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should support direct promise binding', () => {
        return request(server.app).get('/test/1')
            .then(res => {
                expect(res.body.result).not.to.eq(undefined);
            });
    });

    it('should handle secure requests', () => {
        let token = jwt.sign({
            nickname: "user.login",
            lodestoneId: "user.lodestoneId",
            role: 1
        }, "secret");
        return request(server.app).get('/secure/1').set("authorization", "Bearer " + token).then(res => {
            expect(res.body.role).to.eql(1);
        });
    });

    it('should reject secure requests without auth', () => {
        return request(server.app).get('/secure/1').catch(err => {
            expect(err.status).to.eql(401);
        });
    });
});