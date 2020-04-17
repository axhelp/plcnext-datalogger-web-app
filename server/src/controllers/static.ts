import { Router } from "express";
import path from "path";
import { getDeviceHostName } from "../util/common";
import express, {Request, Response} from "express";


export const staticRouter = () => {
    const router = Router();
    const dirnameTsSrc = path.join(__dirname, "../").replace("/dist", "");
    router.use(
        express.static(path.join(dirnameTsSrc, "public"))
    );

    router.get("/logo.gif", (req: Request, res: Response) => {
        const [host, port] = req.headers.host.split(":");
        res.redirect(`http://${getDeviceHostName(host)}/wbm/logo.gif`);
    });

    router.get("/favicon.ico", (req: Request, res: Response) => {
        const [host, port] = req.headers.host.split(":");
        res.redirect(`http://${getDeviceHostName(host)}/wbm/favicon.ico`);
    });

    router.get("/wbm/:fileName", (req: Request, res: Response) => {
        const [host, port] = req.headers.host.split(":");
        res.redirect(`http://${getDeviceHostName(host)}/wbm/${req.params.fileName}`);
    });

    return router;
};
