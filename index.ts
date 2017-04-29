//dependences
import express = require('express');
import bodyParser = require('body-parser');

//import des routes
const userRoute = require("./src/routes/userRoute");
const progressRoute = require("./src/routes/progressRoute");
const roleRoute = require("./src/routes/roleRoute");
const linkRoute = require("./src/routes/linkRoute");


// app.get("/login", (req, res) => {

// });


// app.get("/me", (req, res) => {

// });

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

    private config() {
        this.app.use(bodyParser.json());
    }

    private routes() {
        this.app.use("/api/users", userRoute);
        this.app.use("/api/progression", progressRoute);
        this.app.use("/api/roles", roleRoute);
        this.app.use("/api/links", linkRoute);
    }

    private start() {
        this.app.listen(this.port, () => {
            console.log("Server is running");
        });
    }

    public static bootstrap(): Server {
        return new Server();
    }

}

Server.bootstrap();