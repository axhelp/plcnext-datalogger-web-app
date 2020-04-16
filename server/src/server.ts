import app from "./app";
import logger from "./util/logger";

const server = app.listen(app.get("port"), () => {
    const port = app.get("port");
    const env = app.get("env");

    logger.info(
        `App is running at http://localhost:${port} in ${env} mode`
    );
});

export default server;
