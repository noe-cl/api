import { expect } from "chai";
import { UserRepository } from "../../src/model/repository/user-repository";
import { MysqlDriver } from "../../src/core/db/mysql-driver";
import { UsersEndpoint } from "../../src/endpoint/users/users-endpoint";
import { User } from "../../src/model/bean/user";
import { Injector } from "../../src/core/injector";
import { MockMysqlDriver } from "../mock/mysql-driver";
import { MockUserRepository } from "../mock/repository/user-repository";
import { Config } from "../../src/config/config";
import { MockConfig } from "../mock/config";

/**
 *  users endpoint unit tests.
 */


Injector.activateTestingMode();

Injector.registerMock(MysqlDriver, MockMysqlDriver);
Injector.registerMock(UserRepository, MockUserRepository);
Injector.registerMock(Config, MockConfig);


const endpoint = Injector.instantiate(UsersEndpoint);

describe('UsersEndpoint', () => {

    it('should get all', () => {
        return endpoint.getAll().then(all => {
            expect(all.length).to.eq(1);
            expect(all[0].login).to.eq("foo");
        });
    });

    it('should return 404 if not found', () => {
        return endpoint.getOne(1337).catch(err => {
            expect(err.status).to.eql(404);
        })
    });

    it('should get one', () => {
        return endpoint.getOne(158).then(one => {
            expect(one.login).to.eq("foo");
        });
    });

    it('should create', () => {
        const user: User = {
            lodestoneId: 546879,
            login: "foo",
            password: "bar",
            role_id: 1,
            role: {
                id: 1,
                role: "tester"
            }
        };
        return endpoint.post(user).then(one => {
            expect(one.lodestoneId).to.eq(546879);
        });
    });

    it('should update', () => {
        const user: User = {
            lodestoneId: 13246,
            login: "foo",
            password: "bar",
            role_id: 1,
            role: {
                id: 1,
                role: "tester"
            }
        };
        return endpoint.put(13246, user).then(one => {
            expect(one.login).to.eq("foo");
        });
    });

    it('should delete', () => {
        return endpoint.delete(1346);
    });

});