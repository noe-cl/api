import { EndpointOptions } from "../endpoint-options";
/**
 * Created by Miu on 29/04/2017.
 */
export function Endpoint(options: EndpointOptions): any {
    return (target: any) => {
        options.secure = options.secure || false;
        Reflect.defineMetadata('endpoint', options, target);
    };
}