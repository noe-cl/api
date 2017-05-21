import { Injectable } from "../../core/decorator/injectable";
import { Repository } from "../../core/db/repository";
import { Subscription } from "../bean/subscription";
import { MysqlDriver } from "../../core/db/mysql-driver";
import { APIError } from "../../core/api-error";

@Injectable
export class SubscriptionRepository extends Repository<Subscription>{

    constructor(private connection: MysqlDriver) {
        super(connection);
    }

    getTable(): string {
        return "subscriptions";
    }

    getModelClass(): new (...args: any[]) => Subscription {
        return Subscription;
    }


    getSubscribersIdByEventId(eventId: number): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            this.connection.query("SELECT id_user FROM ? WHERE id_event = ?", [this.getTable(), eventId]).then((results) => {
                if (results.length > 0) {
                    resolve(results);
                } else {
                    reject(new APIError(404, Repository.NOT_FOUND));
                }
            }).catch(reject);
        });

    }

}