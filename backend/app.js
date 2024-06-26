const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");

//put routers below
const userRouter = require("./controllers/users");
const entryRouter = require("./controllers/entries");
const journalRouter = require("./controllers/journals");
const loginRouter = require("./controllers/login");
const gamesRouter = require("./controllers/games");
const filmsRouter = require("./controllers/films");
const bookRouter = require("./controllers/books");

const mongoose = require("mongoose");
const audioRouter = require("./controllers/audio");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to mongoDB:", error.message);
  });

const corsConfig = {
  origin: [
    "https://www.usecooldown.com",
    "https://usecooldown.com",
    "https://api.mobygames.com",
    "http://localhost:3000/",
  ],
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.static("build"));
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/entries", entryRouter);
app.use("/api/journals", journalRouter);
app.use("/api/games", gamesRouter);
app.use("/api/films", filmsRouter);
app.use("/api/books", bookRouter);
app.use("/api/audio", audioRouter);

module.exports = app;
