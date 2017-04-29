import {EndpointOptions} from "../endpoint-options";
/**
 * Created by Miu on 29/04/2017.
 */
export function Endpoint(options: EndpointOptions) {
    return (target) => {
        Reflect.defineProperty(target, 'endpoint', {value: options});
    };
}