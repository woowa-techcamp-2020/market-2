import app from "./config/express";
import dbService from "./app/service/db.service";
import logger from "./config/logger";
import { port, env, migrate } from "./config/vars";

app.listen(port, () => {
  logger.info("server started on port " + port + " (" + env + ")");
  dbService(env, migrate).start();
});

module.exports = app;
