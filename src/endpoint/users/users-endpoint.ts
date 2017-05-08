import { Endpoint } from "../../core/decorator/endpoint";
import { GetOne } from "../../core/decorator/get-one";
import { Post } from "../../core/decorator/post";
import { Put } from "../../core/decorator/put";
import { Delete } from "../../core/decorator/delete";
import { GetAll } from "../../core/decorator/get-all";

import { UserRepository } from "../../model/repository/user-repository";
import { User } from "../../model/bean/user";

@Endpoint({
    route: '/users'
})
export class UsersEndpoint {

    constructor(private repo: UserRepository) {
    }

    @GetOne
    public getOne(id: number): Promise<User> {
        return this.repo.get(id);
    }

    @GetAll
    public getAll(): Promise<User[]> {
        return this.repo.getAll();
    }

    @Post
    public post(body: User): Promise<User> {
        return this.repo.create(body);
    }

    @Put
    public put(id: number, body: User): Promise<User> {
        return this.repo.update(body.lodestoneId, body);
    }

    @Delete
    public delete(id: number): void {
        this.repo.delete(id);
    }

}