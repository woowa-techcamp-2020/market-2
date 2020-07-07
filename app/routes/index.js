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

router.get("/login", (req, res) => {
  console.log("here render");
  res.render("html/page/login");
});

router.get("/register", (req, res) => {
  console.log("here render");
  res.render("html/page/register");
});

router.get("/register_comp", (req, res) => {
  console.log("here render");
  res.render("html/page/register_comp");
});

module.exports = router;
