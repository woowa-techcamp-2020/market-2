import jwt from "jsonwebtoken";
import User from "../model/user";
import logger from "../../config/logger";

const isVerifyToken = (token, req, res, respond) => {
  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  };

  // return
  p.then(respond).catch(onError);
};

exports.signup = async (req, res, next) => {
  const { body } = req;
  if (body.password === body.confirm) {
    try {
      delete body.confirm;
      const user = await User.create(body);

      // return res.render("html/page/register_comp", {
      //   fullName: user.fullName,
      //   uid: user.uid,
      //   email: user.email,
      //   phone: user.phone,
      // });

      return res.status(201).json({ status: 201, result: user });
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
  const secret = req.app.get("jwt-secret");

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

      if (user.password === password) {
        delete user.password;
        delete user.salt;

        const token = await new Promise((resolve, reject) => {
          jwt.sign(
            user.dataValues,
            secret,
            {
              expiresIn: "2h",
              subject: "userInfo",
            },
            (err, token) => {
              if (err) reject(err);
              resolve(token);
            }
          );
        });

        return res.status(200).json({
          status: 200,
          message: "logged in successfully",
          token: token,
          result: user,
        });
      }

      const cErr = {
        message: "Bad Request: password wrong",
        code: "PasswordWrong",
      };
      logger.error("password wrong // method login of user.controller");
      return next(cErr);
    } catch (err) {
      logger.error("500 // method login of user.controller");
      next(err);
    }
  }

  const customErr = {
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
