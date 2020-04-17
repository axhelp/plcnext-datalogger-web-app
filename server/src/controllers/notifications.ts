import { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { notificationsQuery } from "../database/queries";
import { parseDate, addMinutes } from "../util/parsers";
import { Config } from "../config";


export const notificationsRouter = async (req: Request, res: Response) => {
    const {from, to} = req.query;

    try {
        const db = await open({
            filename: Config.db.logsDbPath,
            mode: sqlite3.OPEN_READONLY,
            driver: sqlite3.cached.Database
        });
        const queryOptions = {
            from: parseDate(`${from}`, addMinutes(new Date, -60*24)),
            to: parseDate(`${to}`, new Date),
        };

        const items = await notificationsQuery(db, queryOptions);

        return res.json({items: items});
    }

    catch (e) {
        return res.json({
            items: [],
            error: e.message
        });
    }
};
