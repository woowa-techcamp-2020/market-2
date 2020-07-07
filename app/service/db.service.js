const database = require("../../config/database");
const logger = require("../../config/logger");

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const successfulDBStart = () =>
    logger.info("connection to the database has been established successfully");

  const errorDBStart = (err) =>
    logger.info("unable to connect to the database:", err);

  const wrongEnvironment = () => {
    logger.warn(
      `only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`
    );
    return process.exit(1);
  };

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async () => {
    try {
      await dropDB();
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();
      if (migrate) {
        return startMigrateTrue();
      }
      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const start = async () => {
    switch (environment) {
      case "development":
        await startDev();
        break;
      default:
        await wrongEnvironment();
    }
  };

  return {
    start,
  };
};

module.exports = dbService;
