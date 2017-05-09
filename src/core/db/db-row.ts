/**
 * Created by miu on 09/05/17.
 */
export function DbRow(rowName?: string): any {
    return (target: any) => {
        if (!rowName) {
            rowName = target.name;
        }
        Reflect.defineMetadata("dbRow", rowName, target);
    }
}