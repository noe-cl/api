import { UserRepository } from "../../../src/model/repository/user-repository";
import { User } from "../../../src/model/bean/user";
import { Promise } from 'es6-promise';

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
                role: {
                    id: 1,
                    role: "tester"
                }
            };
            resolve([user]);
        });
    }

    get(id: number) {
        return new Promise<User>((resolve) => {
            const user: User = {
                lodestoneId: id,
                login: "foo",
                password: "bar",
                role: {
                    id: 1,
                    role: "tester"
                }
            };
            resolve(user);
        });
    }

    create(user: User): Promise<User> {
        return new Promise<User>((resolve) => {
            resolve(user);
        });
    }

    update(id: number, user: User): Promise<User> {
        return new Promise<User>((resolve) => {
            resolve(user);
        });
    }

    delete(id: number): void {
    }

}