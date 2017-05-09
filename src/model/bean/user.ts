import { Role } from "./role";
import { DbRow } from "../../core/db/db-row";
export class User {

    @DbRow()
    lodestoneId: number;

    @DbRow()
    login: string;

    @DbRow()
    password: string;

    @DbRow()
    role_id: number;

    role: Role;
}