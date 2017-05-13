import { Endpoint } from "../../core/decorator/endpoint";
import { GetOne } from "../../core/decorator/get-one";
import { Post } from "../../core/decorator/post";
import { Put } from "../../core/decorator/put";
import { Delete } from "../../core/decorator/delete";
import { GetAll } from "../../core/decorator/get-all";
import { Role } from "../../model/bean/role";

import { RoleRepository } from "../../model/repository/role-repository";

@Endpoint({ route: "/roles" })
export class RolesEndpoint {
    constructor(private repo: RoleRepository) {
    }

    @GetOne()
    public getOne(id: number): Promise<Role> {
        return this.repo.get(id);
    }

    @GetAll()
    public getAll(): Promise<Role[]> {
        return this.repo.getAll();
    }

    @Post()
    public post(body: Role): Promise<number> {
        return this.repo.create(body);
    }

    @Put()
    public put(id: number, body: Role): Promise<Role> {
        return this.repo.update(id, body);
    }

    @Delete()
    public delete(id: number): Promise<void> {
        return this.repo.delete(id);
    }

}