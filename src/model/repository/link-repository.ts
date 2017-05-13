import { Injectable } from "../../core/decorator/injectable";
import { Repository } from "../../core/db/repository";
import { Link } from "../bean/link";

@Injectable
export class LinkRepository extends Repository<Link>{

    getTable(): string {
        return "links";
    }

    getModelClass(): new (...args: any[]) => Link {
        return Link;
    }

}