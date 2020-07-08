import httpStatus from "http-status";

class ExtendableError extends Error {
  constructor({ message, details, statusCode, isPublic, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.details = details;
    this.statusCode = statusCode;
    this.isPublic = isPublic;
    this.isOperational = true;
    this.stack = stack;
  }
}

class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} statusCode - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    details,
    stack,
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      details,
      statusCode,
      isPublic,
      stack,
    });
  }
}

module.exports = APIError;
