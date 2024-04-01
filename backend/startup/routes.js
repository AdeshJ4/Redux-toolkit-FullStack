const express = require("express");
const morgan = require("morgan");
const config = require("config");
const deBug = require("debug")("app:startUp");
const customers = require("../routes/customers");
const cors = require("cors");

module.exports = function (app) {
  deBug(`Application Name: ${config.get("name")}`);
  deBug(`NODE_ENV : ${config.get("NODE_ENV")}`);

  if (config.get("NODE_ENV") === "development") {
    app.use(morgan("tiny"));
    app.use(cors());
    deBug("morgan & cors enabled.");
  }
  app.use(express.json());
  app.use("/api/customers", customers);
};
