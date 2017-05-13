import { expect } from "chai";
import { EventRepository } from "../../src/model/repository/event-repository";
import { MysqlDriver } from "../../src/core/db/mysql-driver";
import { EventsEndpoint } from "../../src/endpoint/event/events-endpoint";
import { Event } from "../../src/model/bean/event";
import { Injector } from "../../src/core/injector";
import { MockMysqlDriver } from "../mock/mysql-driver";
import { MockEventRepository } from "../mock/repository/event-repository";
import { Config } from "../../src/config/config";
import { MockConfig } from "../mock/config";

Injector.activateTestingMode();

Injector.registerMock(MysqlDriver, MockMysqlDriver);
Injector.registerMock(EventRepository, MockEventRepository);
Injector.registerMock(Config, MockConfig);


const endpoint = Injector.instantiate(EventsEndpoint);


describe('EventsEndpoint', () => {

    it('should get all', () => {
        return endpoint.getAll().then(all => {
            expect(all.length).to.eq(1);
            expect(all[0].name).to.eq("foo");
        });
    });

    it('should return 404 if not found', () => {
        return endpoint.getOne(1337).catch(err => {
            expect(err.status).to.eql(404);
        })
    });

    it('should get one', () => {
        return endpoint.getOne(1).then(one => {
            expect(one.name).to.eq("foo");
        });
    });

    it('should create', () => {
        const event: Event = {
            id: 1,
            name: "foo",
            user_id: 546879,
            date: ""
        };
        return endpoint.post(event).then(one => {
            expect(one).to.eq(1);
        });
    });

    it('should update', () => {
        const event: Event = {
            id: 1,
            name: "foo",
            user_id: 546879,
            date: ""
        };
        return endpoint.put(1, event).then(one => {
            expect(one.name).to.eq("foo");
        });
    });

    it('should delete', () => {
        return endpoint.delete(1);
    });

});