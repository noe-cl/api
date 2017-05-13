import { Injectable } from "../../core/decorator/injectable";
import { Repository } from "../../core/db/repository";
import { Event } from "../bean/event";

@Injectable
export class EventRepository extends Repository<Event> {

    getTable(): string {
        return "events";
    }

    getModelClass(): new (...args: any[]) => Event {
        return Event;
    }

}