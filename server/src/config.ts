import dotenv from 'dotenv';
import path from 'path';

const dirnameTsSrc = __dirname.replace(`/dist`, ``);
dotenv.config({
    path: path.resolve(dirnameTsSrc, '.env'),
});

export interface IApplicationConfig {
    db: {
        path: string
    }
    webServer: {
        port: number
    }
}

export const Config : IApplicationConfig = {
    db: {
        path: process.env.DB_FILE_PATH,
    },
    webServer: {
        port: parseInt(process.env.PORT) || 3000
    }
};
