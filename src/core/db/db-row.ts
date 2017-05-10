/**
 * Created by miu on 09/05/17.
 */
export function DbRow(rowName?: string): any {
    return (target: any, propertyKey: string) => {
        if (!rowName) {
            rowName = propertyKey;
        }
        Reflect.defineMetadata("dbRow", rowName, target, propertyKey);
    }
}