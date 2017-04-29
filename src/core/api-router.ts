import {Response, Request, Router} from "express";
import {Method} from "./method";
import {APIError} from "./api-error";
import {EndpointOptions} from "./endpoint-options";
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
        let route = (<EndpointOptions>Reflect.get(endpoint, 'endpoint')).route;
        let data = new endpoint();
        for (let metadata of APIRouter.metadataRefs) {
            let impl = Reflect.get(data, metadata.key);
            if (impl !== undefined) {
                if (metadata.key === 'getOne' || metadata.key === 'delete' || metadata.key === 'put') {
                    this.addImplementation(route + '/:id', metadata.method, impl);
                } else {
                    this.addImplementation(route, metadata.method, impl);
                }
            }
        }
    }

    private addImplementation(route: string, method: Method, impl: (...args: any[]) => any): APIRouter {
        switch (method) {
            case Method.GET:
                this.expressRouter.get(route, (req: Request, res: Response) => {
                    try {
                        return res.json(impl(req.params.id));
                    } catch (e) {
                        return res.status(e.code).json({message: e.message});
                    }
                });
                break;
            case Method.POST:
                this.expressRouter.post(route, (req: Request, res: Response) => {
                    try {
                        return res.json(impl(req.body));
                    } catch (e) {
                        return res.status(e.code).json({message: e.message});
                    }
                });
                break;
            case Method.PUT:
                this.expressRouter.put(route, (req: Request, res: Response) => {
                    try {
                        return res.json(impl(req.params.id, req.body));
                    } catch (e) {
                        return res.status(e.code).json({message: e.message});
                    }
                });
                break;
            case Method.DELETE:
                this.expressRouter.delete(route, (req: Request, res: Response) => {
                    try {
                        return res.json(impl(req.params.id));
                    } catch (e) {
                        return res.status(e.code).json({message: e.message});
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