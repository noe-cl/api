/**
 * Created by Miu on 08/05/2017.
 */
export interface Endpoint<T> {

    getOne(id: number): T;
    getAll(id: number): T[];
    post(body: T): T;
    put(id: number, body: T): T;
    delete(id: number): void;
}