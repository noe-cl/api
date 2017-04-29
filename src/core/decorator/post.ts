/**
 * Created by Miu on 29/04/2017.
 */
export function Post(target: any, method: string, descriptor:TypedPropertyDescriptor<(body:any)=>any>) {
    Reflect.defineProperty(target, 'post', descriptor);
}