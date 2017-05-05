/**
 * Created by Miu on 06/05/2017.
 */
import { Promise } from 'es6-promise';

export interface Repository<T> {

    getAll(): Promise<T[]>;

    get(id: number): Promise<T>;

    create(model: T): Promise<T>;

    update(id: number, model: T): Promise<T>;

    delete(id: number): void;
}