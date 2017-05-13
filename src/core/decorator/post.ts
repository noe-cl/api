import { AuthToken } from "../security/auth-token";
import { MethodOptions } from "../method-options";
/**
 * Created by Miu on 29/04/2017.
 */
export function Post(options: MethodOptions = {secure: false, needsParams: false}): any {
    return (target: any, method: string, descriptor: TypedPropertyDescriptor<(body: any, params?: any, token?: AuthToken) => Promise<any>>) => {
        Reflect.defineMetadata('post', {method: method, options: options}, target);
    }
}