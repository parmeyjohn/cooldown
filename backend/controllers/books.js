const express = require("express");
const axios = require("axios");

const bookRouter = express.Router();

bookRouter.get("/", async (request, response) => {
  const books = await axios.get(`https://www.googleapis.com/books/v1/volumes`);
  response.status(200).json(books.data);
});

bookRouter.get("/:id", async (request, response) => {
  const book = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${request.params.id}`
  );

  response.status(200).json(book.data);
});

bookRouter.get("/search/:title", async (request, response) => {
  const books = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${request.params.title}&maxResults=10&projection=lite`
  );
  response.status(200).json(books.data);
});

module.exports = bookRouter;
