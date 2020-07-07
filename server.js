const app = require("./config/express");
const dbService = require("./app/service/db.service");
const logger = require("./config/logger");
const { port, env, migrate } = require("./config/vars");

app.listen(port, () => {
  logger.info("server started on port " + port + " (" + env + ")");
  dbService(env, migrate).start();
});

module.exports = app;
