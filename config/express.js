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
import { logs } from "./vars";
import error from "../app/middleware/error";

const app = express();
app.use(morgan(logs, { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.static("views"));
app.set("../views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(routes);
app.use((req, res, next) => {
  // 404 처리 부분
  res.status(404).redirect("/not_found");
});
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = app;
