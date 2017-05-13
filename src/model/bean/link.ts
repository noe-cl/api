import { DbRow } from "../../core/db/db-row";
export class Link {

    @DbRow()
    id: number;

    @DbRow()
    link: string;

    @DbRow()
    name: string;

    @DbRow()
    description: string;
}