/**
 * Created by Miu on 29/04/2017.
 */
import { expect, request, use } from "chai";
import server from "../../src/index";
import { Endpoint } from "../../src/core/decorator/endpoint";
import { AuthToken } from "../../src/core/security/auth-token";
import { GetOne } from "../../src/core/decorator/get-one";
import * as jwt from "jsonwebtoken";
import { Injector } from "../../src/core/injector";
import { Config } from "../../src/config/config";
import { MockConfig } from "../mock/config";
import { APIError } from "../../src/core/api-error";
import { Promise } from "es6-promise";

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
    getSecure(id: number, token: AuthToken): Promise<AuthToken> {
        return Promise.resolve(token);
    }
}

@Endpoint({
    route: '/errors'
})
class ErrorsEndpoint {

    @GetOne()
    getError(id: number): Promise<any> {
        return Promise.reject(new APIError(id, "Testing errors"));
    }
}

@Endpoint({
    route: '/custom'
})
class CustomEndpoint {

    @GetOne({
        specificRoute: "/:id/specific/:test",
        needsParams: true
    })
    customGet(id: number, params: any): Promise<any> {
        return Promise.resolve(params);
    }
}

Injector.activateTestingMode();
Injector.registerMock(Config, MockConfig);

server.router.addEndpoint(SecureEndpoint);
server.router.addEndpoint(ErrorsEndpoint);
server.router.addEndpoint(CustomEndpoint);

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

    it('should return 404 on resource that does not exists.', () => {
        return request(server.app).get('/test/1337')
            .catch(err => {
                expect(err.status).to.eq(404);
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

    it('should handle specific endpoints', () => {
        return request(server.app).get('/custom/1/specific/123').then(res => {
            expect(parseInt(res.body.test)).to.eql(123);
        });
    });

    it('should return 400 error properly', () => {
        return request(server.app).get('/errors/400').catch(err => {
            expect(err.status).to.eql(400);
        });
    });

    it('should return 500 error properly', () => {
        return request(server.app).get('/errors/500').catch(err => {
            expect(err.status).to.eql(500);
        });
    });

    it('should return invalid error code as 500', () => {
        return request(server.app).get('/errors/0').catch(err => {
            expect(err.status).to.eql(500);
        });
    });
});