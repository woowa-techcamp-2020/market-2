import User from "../model/user";
import logger from "../../config/logger";
import APIError from "../middleware/APIError";
import httpStatus from "http-status";

exports.signup = async (req, res, next) => {
  const { body } = req;
  if (body.password === body.confirm) {
    try {
      delete body.confirm;
      const user = await User.create(body);

      return res.status(200).json(user);
    } catch (err) {
      console.log("err", err);
      logger.error("500 // method signup of user.controller");
      return next(err);
    }
  }
  const err = new APIError({
    message: "Bad Request: Passwords don't match each others",
    statusCode: httpStatus.BAD_REQUEST,
  });
  logger.error(
    "passwords don't match each others // method signup of user.controller"
  );
  next(err);
};

exports.login = async (req, res, next) => {
  const { uid, password } = req.body;

  if (uid && password) {
    try {
      const user = await User.findOne({
        where: {
          uid,
        },
      });

      if (!user) {
        const err = new APIError({
          message: "Bad Request: User not found",
          statusCode: httpStatus.BAD_REQUEST,
        });
        logger.error("user not found // method login of user.controller");
        return next(err);
      }

      if (user.password === password) {
        return res.status(200).json(user);
      }

      const err = new APIError({
        message: "Bad Request: password wrong",
        statusCode: httpStatus.BAD_REQUEST,
      });
      logger.error("password wrong // method login of user.controller");
      return next(customErr);
    } catch (err) {
      logger.error("500 // method login of user.controller");
      next(err);
    }
  }

  customErr = new APIError({
    message: "Bad Request: Email or password is null",
    statusCode: httpStatus.BAD_REQUEST,
  });
  logger.error("email or password null // method login of user.controller");
  next(customErr);
};

exports.existsById = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const user = await User.findOne({
      where: {
        uid,
      },
    });
    if (user) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (err) {
    logger.error("500 // method existsById of user.controller");
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    logger.error("500 // meethod getAll of user.controller");
    next(err);
  }
};
