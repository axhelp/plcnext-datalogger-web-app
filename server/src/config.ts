import dotenv from "dotenv";
import path from "path";

const dirnameTsSrc = __dirname.replace("/dist", "");
dotenv.config({
    path: path.resolve(dirnameTsSrc, ".env"),
});

export interface ApplicationConfig {
    db: {
        dataLoggerDbPath: string,
        logsDbPath: string,
    };
    webServer: {
        port: number
    };
    env: {
        NODE_ENV: string
    };
}

export const Config: ApplicationConfig = {
    db: {
        dataLoggerDbPath: process.env.DL_DB_FILE_PATH,
        logsDbPath: process.env.LOGS_DB_FILE_PATH
    },
    webServer: {
        port: parseInt(process.env.PORT) || 3000
    },
    env: {
        NODE_ENV: process.env.NODE_ENV || "production"
    }
};
