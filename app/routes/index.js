const express = require("express");
const router = express.Router();
const fs = require("fs");
const routesPath = `${__dirname}/`;
const { removeExtensionFromFile } = require("../middleware/utils");

fs.readdirSync(routesPath).filter((file) => {
  const routeFile = removeExtensionFromFile(file);
  return routeFile !== "index" && routeFile !== "auth"
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : "";
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
