import { DbRow } from "../../core/db/db-row";
export class Role {
    @DbRow()
    id: number;

    @DbRow()
    role: string;
}