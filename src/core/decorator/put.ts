import { AuthToken } from "../security/auth-token";
import { MethodOptions } from "../method-options";
/**
 * Created by Miu on 29/04/2017.
 */
export function Put(options: MethodOptions = {secure: false, needsParams: false}): any {
    return (target: any, method: string, descriptor: TypedPropertyDescriptor<(id: number, body: any, params?: any, token?: AuthToken) => Promise<any>>) => {
        Reflect.defineMetadata('put', {method: method, options: options}, target);
    }
}