const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3000);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  bodyParser.json({
    limit: "20mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
  })
);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(require("./app/routes"));
app.listen(app.get("ponrt"));

module.exports = app;

console.log("Server running at " + app.get("port"));
