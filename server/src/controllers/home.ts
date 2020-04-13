import { Request, Response } from "express";
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


export const index = async (req: Request, res: Response) => {
    try {
        const db = await open({
            filename: 'database-web-app.db',
            driver: sqlite3.cached.Database
        });

        const items = await db.all('SELECT Timestamp FROM log_changes_575121309');
        return res.json({items: items})
    }

    catch (e) {
        return res.json({
            items: [],
            error: e.message
        })
    }
};
