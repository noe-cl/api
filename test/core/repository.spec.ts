import { expect } from "chai";
import { Injector } from "../../src/core/injector";
import { MysqlDriver } from "../../src/core/db/mysql-driver";
import { MockMysqlDriver } from "../mock/mysql-driver";
import { MockConfig } from "../mock/config";
import { User } from "../../src/model/bean/user";
import { Repository } from "../../src/core/db/repository";
/**
 * Created by miu on 09/05/17.
 */

Injector.activateTestingMode();
Injector.registerMock(MysqlDriver, MockMysqlDriver);


MockMysqlDriver.mockRows.push({table: 'test', data: {id: "1234", login: "Foo"}});
MockMysqlDriver.mockTables.push({table: 'test', data: [{id: "1234", login: "Foo"}]});

class TestRepository extends Repository<User> {

    getModelClass(): new(...args: any[]) => User {
        return User;
    }

    getTable(): string {
        return "test";
    }

    public testParseModel(model: any): any {
        return this.parseModel(model);
    }
}

const repository = new TestRepository(new MockMysqlDriver(new MockConfig()));

describe('Repository', () => {

    it('should be able to get', () => {
        return repository.get(1234).then(data => {
            expect(data.login).to.eql("Foo");
        });
    });

    it('should be able to getAll', () => {
        return repository.getAll().then(data => {
            expect(data.length).to.be.greaterThan(0);
        });
    });

    it('should be able to create', () => {
        return repository.create(new User()).then(data => {
            expect(data.login).to.be.eq("MockedCreation");
        });
    });

    it('should be able to update', () => {
        return repository.update(1234, new User()).then(data => {
            expect(data.login).to.be.eq("Foo");
        });
    });

    it('should be able to delete', () => {
        return repository.delete(0).then(() => {
            expect(/DELETE/i.test(MockMysqlDriver.requests.pop().sql)).to.be.true;
        });
    });

    it('should be able to parse item properly', () => {
        let user = {
            login: "Foo",
            password: "Bar",
            lodestoneId: 123456789
        } as User;
        let parsed = repository.testParseModel(user);
        expect(parsed.login).to.eql("Foo");
        expect(parsed.password).to.eql("Bar");
        expect(parsed.lodestoneId).to.eql(123456789);
    });
});