import { AuthToken } from "../security/auth-token";
/**
 * Created by Miu on 29/04/2017.
 */
export function Post(secure: boolean = false) {
    return (target: any, method: string, descriptor: TypedPropertyDescriptor<(body: any, token?: AuthToken) => any>) => {
        Reflect.defineMetadata('post', {method : method, secure:secure}, target);
    }
}