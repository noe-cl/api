import { AuthToken } from "../security/auth-token";
/**
 * Created by Miu on 29/04/2017.
 */
export function Delete(secure: boolean = false) {
    return (target: any, method: string, descriptor: TypedPropertyDescriptor<(id: number, token?: AuthToken) => Promise<any>>) => {
        Reflect.defineMetadata('delete', {method: method, secure: secure}, target);
    }
}