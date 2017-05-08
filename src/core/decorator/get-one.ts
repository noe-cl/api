import { AuthToken } from "../security/auth-token";
/**
 * Created by Miu on 29/04/2017.
 */
export function GetOne(secure: boolean = false) {
    return (target: any, method: string, descriptor: TypedPropertyDescriptor<(id: number, token?: AuthToken) => any>) => {
        Reflect.defineMetadata('getOne', {method : method, secure:secure}, target);
    }
}