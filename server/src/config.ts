import dotenv from "dotenv";
import path from "path";

const dirnameTsSrc = __dirname.replace("/dist", "");
dotenv.config({
    path: path.resolve(dirnameTsSrc, ".env"),
});

export interface ApplicationConfig {
    db: {
        path: string;
    };
    webServer: {
        port: number;
    };
    env: {
        NODE_ENV: string;
    };
}

export const Config: ApplicationConfig = {
    db: {
        path: process.env.DB_FILE_PATH,
    },
    webServer: {
        port: parseInt(process.env.PORT) || 3000
    },
    env: {
        NODE_ENV: process.env.NODE_ENV || "production"
    }
};
