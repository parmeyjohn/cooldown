const express = require("express");
const axios = require("axios");

const gamesRouter = express.Router();

gamesRouter.get("/", async (request, response) => {
  const games = await axios.get(
    `https://api.mobygames.com/v1/games?limit=10&api_key=${process.env.GAMES_API_SECRET}&format=brief`
  );
  response.status(200).json(games.data);
});

gamesRouter.get("/:id", async (request, response) => {
  const game = await axios.get(
    `https://api.mobygames.com/v1/games?id=${request.params.id}&limit=10&api_key=${process.env.GAMES_API_SECRET}`
  );

  response.status(200).json(game.data);
});

gamesRouter.get("/search/:title", async (request, response) => {
  const games = await axios.get(
    `https://api.mobygames.com/v1/games?title=${request.params.title}&limit=10&api_key=${process.env.GAMES_API_SECRET}&format=brief`
  );
  response.status(200).json(games.data);
});

module.exports = gamesRouter;
