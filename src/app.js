const express = require("express");
const indexRoutes = require("./routes/index.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/", indexRoutes);

app.use(errorMiddleware);

module.exports = app;