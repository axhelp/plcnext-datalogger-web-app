import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
import {Config} from "./config";

// Controllers (route handlers)
import * as dataLoggerController from "./controllers/data-logger";

// Create Express server
const app = express();

// Express configuration
app.set("port", Config.webServer.port);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);


app.get("/data-logger", dataLoggerController.index);



export default app;
