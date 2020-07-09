import User from "../model/user";
import logger from "../../config/logger";
import { encryptoPassword } from "../../views/js/encrypto";

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

  const err = {
    message: "Bad Request: Passwords don't match each others",
    code: "ValidationError",
  };
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
        const err = {
          message: "Bad Request: User not found",
          code: "UserNotFound",
        };
        return next(err);
      }

      if (encryptoPassword(user.password, user.salt) === password) {
        delete user.password;
        delete user.salt;
        return res.status(200).json(user);
      }

      const err = {
        message: "Bad Request: password wrong",
        code: "PasswordWrong",
      };
      logger.error("password wrong // method login of user.controller");
      return next(customErr);
    } catch (err) {
      logger.error("500 // method login of user.controller");
      next(err);
    }
  }

  customErr = {
    message: "Bad Request: Email or password is null",
    code: "BadRequest",
  };
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
    users.map((user) => {
      delete user.password;
      delete user.salt;
      return user;
    });
    return res.status(200).json(users);
  } catch (err) {
    logger.error("500 // meethod getAll of user.controller");
    next(err);
  }
};

exports.getSaltById = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const user = await User.findOne({
      where: {
        uid,
      },
    });
    if (!user) {
      const err = {
        message: "Bad Request: No User Exists",
        code: "NoUser",
      };
      next(err);
    } else {
      res.status(200).json({ salt: user.salt });
    }
  } catch (err) {
    logger.error("500 // method getSaltById of user.controller");
    next(err);
  }
};
