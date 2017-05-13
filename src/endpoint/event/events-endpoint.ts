import { Endpoint } from "../../core/decorator/endpoint";
import { GetOne } from "../../core/decorator/get-one";
import { Post } from "../../core/decorator/post";
import { Put } from "../../core/decorator/put";
import { Delete } from "../../core/decorator/delete";
import { GetAll } from "../../core/decorator/get-all";
import { Event } from "../../model/bean/event";

import { EventRepository } from "../../model/repository/event-repository"

@Endpoint({ route: "/events" })
export class EventsEndpoint {

    constructor(private repo: EventRepository) {
    }

    @GetOne()
    public getOne(id: number): Promise<Event> {
        return this.repo.get(id);
    }

    @GetAll()
    public getAll(): Promise<Event[]> {
        return this.repo.getAll();
    }

    @Post()
    public post(body: Event): Promise<number> {
        return this.repo.create(body);
    }

    @Put()
    public put(id: number, body: Event): Promise<Event> {
        return this.repo.update(id, body);
    }

    @Delete()
    public delete(id: number): Promise<void> {
        return this.repo.delete(id);
    }

}