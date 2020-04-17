import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import { Config } from "./config";
import { staticRouter } from "./controllers/static";
import { dataLoggerRouter } from "./controllers/data-logger";
import { notificationsRouter } from "./controllers/notifications";

// Create Express server
const app = express();

// Express configuration
app.set("port", Config.webServer.port);
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/", staticRouter());
app.get("/data-logger", dataLoggerRouter);
app.get("/notifications", notificationsRouter);

export default app;
