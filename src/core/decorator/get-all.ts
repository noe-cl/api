import { AuthToken } from "../security/auth-token";
import { MethodOptions } from "../method-options";
/**
 * Created by Miu on 29/04/2017.
 */
export function GetAll(options: MethodOptions = {secure: false, needsParams: false}): any {
    return (target: any, method: string,
            descriptor: TypedPropertyDescriptor<(params?: any, token?: AuthToken) => Promise<any[]> | any[]>) => {
        Reflect.defineMetadata('getAll', {method: method, options: options}, target);
    }
}