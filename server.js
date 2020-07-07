const app = require("./config/express");
const logger = require("./config/logger");
const { port, env } = require("./config/vars");

app.listen(port, () =>
  logger.info("server started on port " + port + " (" + env + ")")
);

module.exports = app;
