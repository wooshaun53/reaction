const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const notesRouter = require("./controller/notes");

const app = express();

logger.info("connecting to mongodb");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to mongodb"))
  .catch((error) => logger.error(error.message));

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);

module.exports = app;
