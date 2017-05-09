import { AuthToken } from "../security/auth-token";
/**
 * Created by Miu on 29/04/2017.
 */
export function Put(secure: boolean = false) {
    return (target: any, method: string, descriptor: TypedPropertyDescriptor<(id: number, body: any, token?: AuthToken) => any>) => {
        Reflect.defineMetadata('put', {method: method, secure: secure}, target);
    }
}