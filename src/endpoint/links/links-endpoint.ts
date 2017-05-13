import { Endpoint } from "../../core/decorator/endpoint";
import { GetOne } from "../../core/decorator/get-one";
import { Post } from "../../core/decorator/post";
import { Put } from "../../core/decorator/put";
import { Delete } from "../../core/decorator/delete";
import { GetAll } from "../../core/decorator/get-all";
import { Link } from "../../model/bean/link";

import { LinkRepository } from "../../model/repository/link-repository";

@Endpoint({ route: "/links" })
export class LinksEndpoint {
    constructor(private repo: LinkRepository) {
    }

    @GetOne()
    public getOne(id: number): Promise<Link> {
        return this.repo.get(id);
    }

    @GetAll()
    public getAll(): Promise<Link[]> {
        return this.repo.getAll();
    }

    @Post()
    public post(body: Link): Promise<number> {
        return this.repo.create(body);
    }

    @Put()
    public put(id: number, body: Link): Promise<Link> {
        return this.repo.update(id, body);
    }

    @Delete()
    public delete(id: number): Promise<void> {
        return this.repo.delete(id);
    }

}