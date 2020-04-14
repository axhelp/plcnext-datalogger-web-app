import { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dataQuery } from "../database/queries";
import { parseIntValue, parseDate, addMinutes } from "../util/parsers";


export const index = async (req: Request, res: Response) => {
    const {variableName, from, to, limit} = req.query;

    const limitInt = parseIntValue(`${limit}`, 100);

    if (!variableName) {
        return res.status(422).json({
            items: [],
            error: "'variableName' query parameter is required"
        });
    }

    try {
        const db = await open({
            filename: "database-web-app.db",
            mode: sqlite3.OPEN_READONLY,
            driver: sqlite3.cached.Database
        });
        const queryOptions = {
            from: parseDate(`${from}`, addMinutes(new Date, -1)),
            to: parseDate(`${to}`, new Date),
            variableName: `${variableName}`,
            limit: limitInt
        };

        const items = await dataQuery(db, queryOptions);
        return res.json({items: items});
    }

    catch (e) {
        return res.json({
            items: [],
            error: e.message
        });
    }
};
