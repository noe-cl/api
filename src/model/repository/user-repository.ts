import { Injectable } from "../../core/decorator/injectable";
import { Repository } from "../../core/db/repository";
import { User } from "../bean/user";

@Injectable
export class UserRepository extends Repository<User> {

    getModelClass(): new(...args: any[]) => User {
        return User;
    }

    getTable(): string {
        return "users";
    }

    get idFieldName(): string {
        return "lodestoneId";
    }
}