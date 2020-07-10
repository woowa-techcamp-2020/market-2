import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import routes from "../app/routes";
import logger from "./logger";
import { logs, secret } from "./vars";
import errorHandler from "../app/middleware/errorHandler";
import userRoute from "../app/routes/user.route";

const app = express();
app.use(morgan(logs, { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set the secret key variable for jwt
app.set("jwt-secret", secret);
app.use(methodOverride());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.static("views"));
app.set("../views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use("/", routes);
app.use("/api/users", userRoute);
errorHandler(app);
app.use((req, res, next) => {
  // 404 처리 부분
  res.status(404).redirect("/not_found");
});

module.exports = app;
