import { UserRepository } from "../../../src/model/repository/user-repository";
import { User } from "../../../src/model/bean/user";
import { Promise } from 'es6-promise';
import { APIError } from "../../../src/core/api-error";
import { Repository } from "../../../src/core/db/repository";

/**
 * Created by Miu on 08/05/2017.
 */
export class MockUserRepository extends UserRepository {

    getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve) => {
            const user: User = {
                lodestoneId: 1,
                login: "foo",
                password: "bar",
                role_id: 1,
                role: {
                    id: 1,
                    role: "tester"
                }
            };
            resolve([user]);
        });
    }

    get(id: number) {
        return new Promise<User>((resolve, reject) => {
            if (id === 1337) {
                reject(new APIError(404, Repository.NOT_FOUND));
            } else {
                const user: User = {
                    lodestoneId: id,
                    login: "foo",
                    password: "bar",
                    role_id: 1,
                    role: {
                        id: 1,
                        role: "tester"
                    }
                };
                resolve(user);
            }
        });
    }

    create(user: User): Promise<number> {
        return new Promise<number>((resolve) => {
            resolve(1);
        });
    }

    update(id: number, user: User): Promise<User> {
        return new Promise<User>((resolve) => {
            resolve(user);
        });
    }

    delete(id: number): Promise<void> {
        return new Promise<void>((resolve) => {
            resolve();
        });
    }

}