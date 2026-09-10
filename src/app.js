const express = require("express");
const indexRoutes = require("./routes/index.routes");
const usersRoutes = require("./routes/users.routes");
const productsRoutes = require("./routes/products.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/", indexRoutes);

app.use("/api/users", usersRoutes);

app.use("/api/products", productsRoutes);

app.use(errorMiddleware);

module.exports = app;