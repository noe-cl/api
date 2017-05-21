import { DbRow } from "../../core/db/db-row";

export class Subscription {

    @DbRow()
    id: number;

    @DbRow()
    id_event: number;

    @DbRow()
    id_user: number;
}