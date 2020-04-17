import {Config} from "../config";

export const getDeviceHostName = (requestUrl: string) => {
    return Config.env.NODE_ENV === "development"
        ? "192.168.1.10"
        : requestUrl;
};
