/**
 * Created by Miu on 29/04/2017.
 */
export function GetAll(target: any, method: string, descriptor: TypedPropertyDescriptor<() => any[]>) {
    Reflect.defineMetadata('getAll', method, target);
}