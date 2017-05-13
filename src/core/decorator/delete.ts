import { AuthToken } from "../security/auth-token";
import { MethodOptions } from "../method-options";
/**
 * Created by Miu on 29/04/2017.
 */
export function Delete(options: MethodOptions = {secure: false, needsParams: false}): any {
    return (target: any, method: string, descriptor: TypedPropertyDescriptor<(id: number, params?:any, token?: AuthToken) => Promise<any>>) => {
        Reflect.defineMetadata('delete', {method: method, options: options}, target);
    }
}