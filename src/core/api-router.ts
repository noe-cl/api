import {Request, Response, Router} from "express";
import {Method} from "./method";
import {EndpointOptions} from "./endpoint-options";
import {Injector} from "./injector";
import "reflect-metadata";
/**
 * Created by Miu on 29/04/2017.
 */
export class APIRouter {

    constructor(private expressRouter: Router) {
    }

    static metadataRefs: { method: Method, key: string }[] = [
        {method: Method.GET, key: 'getOne'},
        {method: Method.GET, key: 'getAll'},
        {method: Method.POST, key: 'post'},
        {method: Method.PUT, key: 'put'},
        {method: Method.DELETE, key: 'delete'},
    ];

    public addEndpoint(endpoint: new() => any): void {
        let route = (<EndpointOptions>Reflect.getMetadata('endpoint', endpoint)).route;
        let instance = Injector.instantiate(endpoint);
        for (let metadata of APIRouter.metadataRefs) {
            let impl = Reflect.getMetadata(metadata.key, instance);
            if (impl !== undefined) {
                if (metadata.key === 'getOne' || metadata.key === 'delete' || metadata.key === 'put') {
                    this.addImplementation(route + '/:id', metadata.method, instance, impl);
                } else {
                    this.addImplementation(route, metadata.method, instance, impl);
                }
            }
        }
    }

    private addImplementation(route: string, method: Method, instance: any, impl: string): APIRouter {
        switch (method) {
            case Method.GET:
                this.expressRouter.get(route, (req: Request, res: Response) => {
                    try {
                        return res.json(instance[impl](req.params.id));
                    } catch (e) {
                        return res.status(e.code || 500).json({message: e.message});
                    }
                });
                break;
            case Method.POST:
                this.expressRouter.post(route, (req: Request, res: Response) => {
                    try {
                        return res.json(instance[impl](req.body));
                    } catch (e) {
                        return res.status(e.code || 500).json({message: e.message});
                    }
                });
                break;
            case Method.PUT:
                this.expressRouter.put(route, (req: Request, res: Response) => {
                    try {
                        return res.json(instance[impl](req.params.id, req.body));
                    } catch (e) {
                        return res.status(e.code || 500).json({message: e.message});
                    }
                });
                break;
            case Method.DELETE:
                this.expressRouter.delete(route, (req: Request, res: Response) => {
                    try {
                        return res.json(instance[impl](req.params.id));
                    } catch (e) {
                        return res.status(e.code || 500).json({message: e.message});
                    }
                });
                break;
        }
        return this;
    }

    get router(): Router {
        return this.expressRouter;
    }
}