const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const routes = require("../app/routes");
const { logs } = require("./vars");
const error = require("../app/middleware/error");
const app = express();

app.use(morgan(logs));
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
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = app;
