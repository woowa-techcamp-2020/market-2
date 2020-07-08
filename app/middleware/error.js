import httpStatus from "http-status";
import expressValidation from "express-validation";
import { APIError } from "./APIError";
import { env } from "../../config/vars";
import logger from "../../config/logger";

const handler = (err, req, res, next) => {
  const response = {
    statusCode: err.statusCode,
    message: err.message || httpStatus[err.statusCode],
    details: err.details,
    stack: err.stack,
  };

  if (env !== "development") {
    delete response.stack;
  }

  res.status(err.statusCode).json(response);
};

const converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: "Validation Error",
      error: err.error,
      statusCode: err.statusCode,
      stack: err.stack,
    });
  }

  logger.error("ERROR", err);
  handler(convertedError, req, res);
};

const notFound = (req, res, next) => {
  const err = new APIError({
    message: "Not found",
    statusCode: httpStatus.NOT_FOUND,
  });
  handler(err, req, res);
};

module.exports = {
  handler,
  converter,
  notFound,
};
