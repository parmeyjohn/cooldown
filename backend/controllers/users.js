const mongoose = require("mongoose");
const { response } = require("../app");
const express = require("express");
const User = require("../models/user.js");
const userRouter = express.Router();
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const { expressjwt: jwt } = require("express-jwt");

userRouter.get(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (request, response) => {
    const users = await User.find({}).populate("journals");
    response.status(200).json(users);
  }
);

userRouter.post("/", async (request, response) => {
  const { password, email } = request.body;
  // check if the user already exists in the DB
  const prevUser = await User.findOne({ email: email });

  if (!password || password.length < 3 || prevUser) {
    response
      .status(400)
      .json({ error: "email/password incorrect or duplicate" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    email,
    passwordHash,
  });

  try {
    const newUser = await user.save();
    response.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    response.status(400).end();
  }
});

userRouter.delete("/:id", async (request, response) => {
  try {
    await User.findByIdAndDelete({ _id: request.params.id });
    response.status(204);
  } catch (error) {
    response.status(400).end();
  }
});

module.exports = userRouter;
