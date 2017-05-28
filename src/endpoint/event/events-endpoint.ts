import { Endpoint } from "../../core/decorator/endpoint";
import { GetOne } from "../../core/decorator/get-one";
import { Post } from "../../core/decorator/post";
import { Put } from "../../core/decorator/put";
import { Delete } from "../../core/decorator/delete";
import { GetAll } from "../../core/decorator/get-all";
import { Event } from "../../model/bean/event";

import { EventRepository } from "../../model/repository/event-repository";
import { SubscriptionRepository } from "../../model/repository/subscription-repository";

@Endpoint({ route: "/events" })
export class EventsEndpoint {

    constructor(private eventRepo: EventRepository, private subRepo: SubscriptionRepository) {
    }

    @GetOne()
    public getOne(id: number): Promise<Event> {
        return new Promise<Event>((resolve, reject) => {
            this.eventRepo.get(id).then((event) => {
                this.subRepo.getSubscribersIdByEventId(event.id).then((subscribersId) => {
                    event.subscribers = subscribersId;
                    resolve(event);
                });
            });
        })
    }

    @GetAll()
    public getAll(): Promise<Event[]> {
        return new Promise<Event[]>((resolve, reject) => {
            this.eventRepo.getAll().then((events) => {

                events.forEach((event) => {
                    this.subRepo.getSubscribersIdByEventId(event.id).then((subscribersId) => {
                        event.subscribers = subscribersId;
                    });
                });
                resolve(events);
            });
        });
    }

    @Post()
    public post(body: Event): Promise<number> {
        return this.eventRepo.create(body);
    }

    @Put()
    public put(id: number, body: Event): Promise<Event> {
        return this.eventRepo.update(id, body);
    }

    @Delete()
    public delete(id: number): Promise<void> {
        return this.eventRepo.delete(id);
    }

    @Post({ specificRoute: "/:id/subscriptions", needsParams: true })
    public postMessage(body: number, id: number): Promise<number> {
        return this.subRepo.createSubscription(id, body);
    }



}