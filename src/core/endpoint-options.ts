/**
 * Created by Miu on 29/04/2017.
 */
export interface EndpointOptions {
    route: string,
    get?: (id: number) => any,
    post?: (model:any) => any,
    put?: (id:number, model:any) => any,
    delete?: (id: number) => void,
}