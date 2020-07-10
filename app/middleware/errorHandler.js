import httpStatus from "http-status";
import { AssertionError } from "assert";
import { BaseError } from "sequelize";
import logger from "../../config/logger";
import { env } from "../../config/vars";

const handleNotFoundError = (req, res, next) => {
  const response = {
    result: "ERROR",
    code: "NotFound",
    message: req.url + " not found",
  }; // 404 처리 부분

  res.status(httpStatus.NOT_FOUND).redirect("/not_found").json(response);

  // res.status(httpStatus.NOT_FOUND).json(response);
};

const handleAssertionError = (err, req, res, next) => {
  if (err instanceof AssertionError) {
    logger.error(err.stack);
    const response = {
      result: "ERROR",
      code: "AssertionError",
      message: err.message,
      stack: err.stack,
    };

    if (env !== "development") {
      delete response.stack;
    }

    res.status(httpStatus.BAD_REQUEST).json(response);
  } else next(err);
};

const handleDatabaseError = (err, req, res, next) => {
  if (err instanceof BaseError) {
    logger.error(err.stack);
    const response = {
      result: "ERROR",
      code: "SequelizeError",
      message: err.message,
      stack: err.stack,
    };

    if (env !== "development") {
      delete response.stack;
    }

    res.status(httpStatus.UNPROCESSABLE_ENTITY).json(response);
  } else next(err);
};

const handleDefaultError = (err, req, res, next) => {
  logger.error(err.stack);
  const response = {
    result: "ERROR",
    code: err.code,
    message: err.message,
  };

  if (env !== "development") {
    delete response.stack;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
};

module.exports = (app) => {
  app.use(handleNotFoundError);
  app.use(handleAssertionError);
  app.use(handleDatabaseError);
  app.use(handleDefaultError);
};
