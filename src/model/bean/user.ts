import { Role } from "./role";
export interface User {
    lodestoneId: number;
    login: string;
    password: string;
    role: Role;
}