const express = require("express");
const axios = require("axios");

const filmsRouter = express.Router();
const apiKey = "a3f7ec31";

filmsRouter.get("/", async (request, response) => {
  const films = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}`);
  response.status(200).json(films.data);
});

filmsRouter.get("/:id", async (request, response) => {
  const films = await axios.get(
    `http://www.omdbapi.com/?apikey=${apiKey}&i=${request.params.id}`
  );

  console.log("here id");
  response.status(200).json(films.data);
});

filmsRouter.get("/search/:title", async (request, response) => {
  const films = await axios.get(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${request.params.title}`
  );
  console.log("here");
  response.status(200).json(films.data);
});

module.exports = filmsRouter;
