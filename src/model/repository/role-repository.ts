import { Injectable } from "../../core/decorator/injectable";
import { Repository } from "../../core/db/repository";
import { Role } from "../bean/role";

@Injectable
export class RoleRepository extends Repository<Role>{

    getTable(): string {
        return "roles";
    }

    getModelClass(): new (...args: any[]) => Role {
        return Role;
    }

}