import { DbRow } from "../../core/db/db-row";

export class Event {
    @DbRow()
    id: number;

    @DbRow()
    name: string;

    @DbRow()
    user_id: number;

    @DbRow()
    date: string;

    subscribers: number[];
} 