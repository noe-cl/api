import { NextFunction, Request, Response, Router } from "express";
import { Method } from "./method";
import { EndpointOptions } from "./endpoint-options";
import { Injector } from "./injector";
import * as jwt from "jsonwebtoken";
import "reflect-metadata";
import { Config } from "../config/config";
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
        let options = (<EndpointOptions>Reflect.getMetadata('endpoint', endpoint));
        let instance = Injector.instantiate(endpoint);
        for (let metadataRef of APIRouter.metadataRefs) {
            let metadata = Reflect.getMetadata(metadataRef.key, instance);
            if (metadata !== undefined) {
                if (metadataRef.key === 'getOne' || metadataRef.key === 'delete' || metadataRef.key === 'put') {
                    this.addImplementation(options.route + '/:id', metadataRef.method, instance, metadata.method, metadata.secure || options.secure);
                } else {
                    this.addImplementation(options.route, metadataRef.method, instance, metadata.method, metadata.secure || options.secure);
                }
            }
        }
    }

    public authcheck(secure: boolean) {
        return (req: Request, res: Response, next: NextFunction) => {
            let userToken = (req.get('authorization') || "").split(" ")[1];
            if (secure && userToken === undefined) {
                return res.status(401).json({message: "Unauthorized."});
            } else {
                (<any>req).user = jwt.decode(userToken, Injector.instantiate(Config));
                next();
            }
        }
    }

    private addImplementation(route: string, method: Method, instance: any, impl: string, secure: boolean): void {
        let finalImpl = (req: Request, res: Response) => {
            if ([Method.GET, Method.DELETE].indexOf(method) > -1) {
                return res.json(instance[impl](req.params.id, (<any>req).user));
            } else if (method === Method.POST) {
                return res.json(instance[impl](req.body, (<any>req).user));
            } else if (method === Method.PUT) {
                return res.json(instance[impl](req.params.id, req.body, (<any>req).user));
            }
        };
        switch (method) {
            case Method.GET:
                this.expressRouter.get(route, this.authcheck(secure), finalImpl);
                break;
            case Method.PUT:
                this.expressRouter.put(route, this.authcheck(secure), finalImpl);
                break;
            case Method.POST:
                this.expressRouter.post(route, this.authcheck(secure), finalImpl);
                break;
            case Method.DELETE:
                this.expressRouter.delete(route, this.authcheck(secure), finalImpl);
                break;
        }
    }


    get router(): Router {
        return this.expressRouter;
    }
}