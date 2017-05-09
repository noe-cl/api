import { Injectable } from "../../core/decorator/injectable";
import { Repository } from "../../core/db/repository";
import { User } from "../bean/user";

@Injectable
export class UserRepository extends Repository<User> {

    getTable(): string {
        return "users";
    }
}