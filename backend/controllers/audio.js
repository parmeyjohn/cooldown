const express = require("express");
const axios = require("axios");

const audioRouter = express.Router();

var accessToken = "";

const getAccessToken = async () => {
  var authOptions = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.AUDIO_API_ID + ":" + process.env.AUDIO_API_SECRET
        ).toString("base64"),
    },
  };

  try {
    accessToken = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      authOptions
    );
    console.log("token worked", accessToken.data.access_token);
  } catch (err) {
    console.log("refresh access token didnt work", err);
  }
};

audioRouter.get("/", async (request, response) => {
  const audio = await axios.get(`https://api.spotify.com/v1/search`);
  response.status(200).json(audio.data);
});

audioRouter.get("/:id", async (request, response) => {
  if (!accessToken) {
    await getAccessToken();
  }
  const id = encodeURIComponent(request.params.id);
  try {
    const audio = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: { Authorization: `Bearer ${accessToken.data.access_token}` },
    });

    response.status(200).json(audio.data);
  } catch (error) {
    console.log("error occurred", error);
  }
});

audioRouter.get("/search/:title", async (request, response) => {
  if (!accessToken) {
    await getAccessToken();
  }
  const title = encodeURIComponent(request.params.title);
  try {
    const audio = await axios.get(
      `https://api.spotify.com/v1/search?q=${title}&type=album&market=US&limit=5`,
      { headers: { Authorization: `Bearer ${accessToken.data.access_token}` } }
    );
    response.status(200).json(audio.data);
  } catch (error) {
    console.log("error occurred", error);
  }
});

module.exports = audioRouter;
