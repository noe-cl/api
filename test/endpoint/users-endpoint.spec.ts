import { expect } from "chai";
import { UserRepository } from "../../src/model/repository/user-repository";
import { MysqlDriver } from "../../src/model/config/connection";
import { UsersEndpoint } from "../../src/endpoint/users/users-endpoint";
import { Promise } from "es6-promise";
import { User } from "../../src/model/bean/user";
import { IConnection } from "mysql";

/**
 *  users endpoint unit tests.
 */
class MockMysqlDriver implements MysqlDriver{
    connection: IConnection;

    constructor() {
    }
}

class MockRepository extends UserRepository {

    constructor() {
        super(new MockMysqlDriver());
    }

    getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve) => {
            const user: User = {
                lodestoneId: 1,
                login: "foo",
                password: "bar",
                role: {
                    id: 1,
                    role: "tester"
                }
            };
            resolve([user]);
        });
    }

    get(id: number) {
        return new Promise<User>((resolve) => {
            const user: User = {
                lodestoneId: id,
                login: "foo",
                password: "bar",
                role: {
                    id: 1,
                    role: "tester"
                }
            };
            resolve(user);
        });
    }

    create(user: User): Promise<User> {
        return new Promise<User>((resolve) => {
            resolve(user);
        });
    }

    update(id: number, user: User): Promise<User> {
        return new Promise<User>((resolve) => {
            resolve(user);
        });
    }

    delete(id: number): void {
    }

}

const endpoint = new UsersEndpoint(new MockRepository());

describe('UsersEndpoint', () => {

    it('should get all', () => {
        return endpoint.getAll().then(all => {
            expect(all.length).to.eq(1);
            expect(all[0].login).to.eq("foo");
        });
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
        expect(endpoint.delete(1346)).to.eq(null);
    });

});