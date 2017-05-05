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
    public getOne(id: number): any {

    }

    @GetAll
    public getAll(): User[] {
        this.repo.getAll();
        let userArray = [];
        return userArray;
    }

    @Post
    public post(body: User): any {
        this.repo.create(body).then((user) => {
            return user;
        }).catch((error) => {
            return error;
        });
    }

    @Put
    public put(): any {

    }

    @Delete
    public delete(): void {

    }

}