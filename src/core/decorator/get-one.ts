/**
 * Created by Miu on 29/04/2017.
 */
export function GetOne(target: any, method: string, descriptor: TypedPropertyDescriptor<(id: number) => any>) {
    Reflect.defineMetadata('getOne', method, target);
}