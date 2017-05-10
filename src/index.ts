import * as express from "express";
import * as bodyParser from "body-parser";
import { ExampleEndpoint } from "./endpoint/example/example-endpoint";
import { APIRouter } from "./core/api-router";
import { UsersEndpoint } from "./endpoint/users/users-endpoint";
import { AuthEndpoint } from "./endpoint/auth/auth-endpoint";
import { APIError } from "./core/api-error";

// All of the endpoints have to be added to this array in order to get them loaded into the API.
const endpoints: (new (...args: any[]) => any)[] = [
    ExampleEndpoint,
    UsersEndpoint,
    AuthEndpoint
];

class Server {

    port: number;
    app: express.Application;
    router: APIRouter;

    constructor() {
        this.port = parseInt(process.argv[2]) || 3000;
        this.app = express();

        this.config();

        this.routes();

        this.start();
    }

    private config(): void {
        this.app.use(bodyParser.json());
    }

    private routes(): void {
        this.router = new APIRouter(express.Router());
        for (let endpoint of endpoints) {
            this.router.addEndpoint(endpoint);
        }
        this.app.use(this.router.router);

        this.app.use(this.errorHandler);
    }

    private start(): void {
        this.app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });
    }

    private errorHandler = (err: APIError, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }
        return res.status(err.code || 500).send(err.message);
    };

    public static bootstrap(): Server {
        return new Server();
    }

}

export default Server.bootstrap();