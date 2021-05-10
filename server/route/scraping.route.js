const express = require("express");
const app = express();
const Scrap = require("../controller/scraping.controller");

app.get("/get-data", Scrap.parseHome);

module.exports = app;
