const express = require("express");
const appRouter = require("./app");

module.exports = (app) => {
  app.use("/app", appRouter);
};
