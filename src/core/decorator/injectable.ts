import { Injector } from "../injector";
/**
 * Created by Miu on 01/05/2017.
 */
export function Injectable(target: any) {
    Injector.register(target.name, target);
}