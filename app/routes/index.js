const express = require("express");
const router = express.Router();
const data = require("../../public/data.json");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("html/page/login");
});

router.get("/register", (req, res) => {
  res.render("html/page/register", {
    Emails: data["Emails"],
  });
});

router.get("/register_comp", (req, res) => {
  res.render("html/page/register_comp");
});

module.exports = router;
