import * as express from "express";
import * as bodyParser from "body-parser";
import { ExampleEndpoint } from "./endpoint/example/example-endpoint";
import { APIRouter } from "./core/api-router";
import { UsersEndpoint } from "./endpoint/users/users-endpoint";

// All of the endpoints have to be added to this array in order to get them loaded into the API.
const endpoints: (new (...args: any[]) => any)[] = [
    ExampleEndpoint, UsersEndpoint
];

class Server {

    port: number;
    app: express.Application;

    constructor() {
        this.port = parseInt(process.argv[2]) || 3000;
        this.app = express();

        this.config();

        this.routes();

        this.start();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(require('express-promise')());
    }

    private routes(): void {
        let router: APIRouter = new APIRouter(express.Router());
        for (let endpoint of endpoints) {
            router.addEndpoint(endpoint);
        }
        this.app.use(router.router);
    }

    private start(): void {
        this.app.listen(this.port, () => {
            console.log("Server is running");
        });
    }

    public static bootstrap(): Server {
        return new Server();
    }

}

export default Server.bootstrap().app;