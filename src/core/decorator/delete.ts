/**
 * Created by Miu on 29/04/2017.
 */
export function Delete(target: any, method: string, descriptor:TypedPropertyDescriptor<(id:number)=>any>) {
    Reflect.defineProperty(target, 'delete', descriptor);
}