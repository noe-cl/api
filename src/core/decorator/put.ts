/**
 * Created by Miu on 29/04/2017.
 */
export function Put(target: any, method: string, descriptor: TypedPropertyDescriptor<(id: number, body: any) => any>) {
    Reflect.defineMetadata('put', method, target);
}