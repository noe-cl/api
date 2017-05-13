import { NextFunction, Request, Response, Router } from "express";
import { Method } from "./method";
import { EndpointOptions } from "./endpoint-options";
import { Injector } from "./injector";
import * as jwt from "jsonwebtoken";
import "reflect-metadata";
import { Config } from "../config/config";
import { MethodOptions } from "./method-options";
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
                let route = APIRouter.getRoute(metadataRef.key, options.route, metadata.options);
                this.addImplementation(route, metadataRef.method, instance, metadata.method,
                    metadata.options.secure || options.secure, metadata.options.needsParams);
            }
        }
    }

    private static getRoute(key: string, endpointRoute: string, metadataOptions: MethodOptions): string {
        if (metadataOptions.specificRoute !== undefined) {
            return endpointRoute + metadataOptions.specificRoute;
        }
        if (['getOne', 'delete', 'put'].indexOf(key) > -1) {
            return endpointRoute + '/:id';
        } else {
            return endpointRoute;
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

    private rejectionHandler = (error, res) => {
        res.status(error.code > 0 ? error.code : 500).json({message: error.message});
    };

    private addImplementation(route: string, method: Method, instance: any, impl: string, secure: boolean,
                              needsParams: boolean): void {
        let finalImpl = (req: Request, res: Response) => {
            let params = [];
            if ([Method.GET, Method.DELETE].indexOf(method) > -1) {
                params = [req.params.id];
            } else if (method === Method.POST) {
                params = [req.body];
            } else if (method === Method.PUT) {
                params = [req.params.id, req.body];
            }
            if (needsParams) {
                params.push(req.params);
            }
            if (secure) {
                params.push((<any>req).user);
            }
            return instance[impl](...params)
                .then(data => res.json(data))
                .catch(error => {
                    this.rejectionHandler(error, res);
                });
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