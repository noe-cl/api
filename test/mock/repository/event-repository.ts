import { EventRepository } from "../../../src/model/repository/event-repository";
import { Event } from "../../../src/model/bean/event";
import { Promise } from "es6-promise";
import { APIError } from "../../../src/core/api-error";
import { Repository } from "../../../src/core/db/repository";

export class MockEventRepository extends EventRepository {

    getAll(): Promise<Event[]> {
        return new Promise<Event[]>((resolve) => {
            const event: Event = {
                id: 1,
                name: "foo",
                user_id: 546879,
                date: ""
            };
            resolve([event]);
        });
    }

    get(id: number) {
        return new Promise<Event>((resolve, reject) => {
            if (id === 1337) {
                reject(new APIError(404, Repository.NOT_FOUND));
            } else {
                const event: Event = {
                    id: 1,
                    name: "foo",
                    user_id: 546879,
                    date: ""
                };
                resolve(event);
            }
        });
    }

    create(event: Event): Promise<number> {
        return new Promise<number>((resolve) => {
            resolve(1);
        });
    }

    update(id: number, event: Event): Promise<Event> {
        return new Promise<Event>((resolve) => {
            resolve(event);
        });
    }

    delete(id: number): Promise<void> {
        return new Promise<void>((resolve) => {
            resolve();
        });
    }

}