import { AuthToken } from "../security/auth-token";
/**
 * Created by Miu on 29/04/2017.
 */
export function GetAll(secure: boolean = false) {
    return (target: any, method: string,
            descriptor: TypedPropertyDescriptor<(token?: AuthToken) => Promise<any[]> | any[]>) => {
        Reflect.defineMetadata('getAll', {method: method, secure: secure}, target);
    }
}