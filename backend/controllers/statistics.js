const express = require("express");
const Journal = require("../models/journal.js");
const Entry = require("../models/entry.js");
const Statistic = require("../models/statistic.js");

const statsRouter = express.Router();
const { expressjwt: jwt } = require("express-jwt");

const sentimentMap = { Awful: 1, Bad: 2, Okay: 3, Good: 4, Great: 5 };

// MediaType refers to Game, Film, Book, Audio
// obj[mediaType] = duration in hrs
const totalDurationPerMediaType = {
  Game: 0,
  Film: 0,
  Book: 0,
  Audio: 0,
};
const totalEntriesPerMediaType = {
  Game: 0,
  Film: 0,
  Book: 0,
  Audio: 0,
};
const totalSentimentPerMediaType = {
  Game: 0,
  Film: 0,
  Book: 0,
  Audio: 0,
};
const totalDurationPerTitle = { Game: {}, Film: {}, Book: {}, Audio: {} };
const totalSentimentPerTitle = { Game: {}, Film: {}, Book: {}, Audio: {} };

const incrementStatObj = (obj, increment, prop1, prop2 = "") => {
  if (prop2) {
    obj[prop1][prop2] = (obj[prop1][prop2] ?? 0) + increment;
  } else {
    obj[prop1] = (obj[prop1] ?? 0) + increment;
  }
};

statsRouter.get(
  "/",
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  async (request, response) => {
    const journals = await Journal.find({ user: request.auth.id }).populate(
      "entries"
    );
    const entries = journals.flatMap((j) => j.entries);

    entries.forEach((e) => {
      incrementStatObj(totalDurationPerMediaType, e.duration, e.mediaType);
      incrementStatObj(totalEntriesPerMediaType, 1, e.mediaType);
      incrementStatObj(
        totalSentimentPerMediaType,
        sentimentMap[e.sentiment],
        e.mediaType
      );
      incrementStatObj(
        totalDurationPerTitle,
        e.duration,
        e.mediaType,
        e.mediaObj.title
      );
      incrementStatObj(
        totalSentimentPerTitle,
        sentimentMap[e.sentiment],
        e.mediaType,
        e.mediaObj.title
      );
    });

    const sortedMediaTypeByDuration = Object.entries(
      totalDurationPerMediaType
    ).sort((a, b) => b[1] - a[1]);

    const sortedMediaTypeByEntries = Object.entries(
      totalEntriesPerMediaType
    ).sort((a, b) => b[1] - a[1]);

    const sortedMediaTypeBySentiment = Object.entries(
      totalSentimentPerMediaType
    )
      .map(([mediaType, sentimentSum]) => [
        mediaType,
        sentimentSum / totalEntriesPerMediaType[mediaType],
      ])
      .sort((a, b) => b[1] - a[1]);

    const sortedDurationPerTitle = Object.entries(totalDurationPerTitle).map(
      ([mediaType, titleDurations]) =>
        Object.entries(titleDurations)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
    );

    const sortedDurationAllTitles = sortedDurationPerTitle
      .flat()
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const sortedSentimentPerTitle = Object.entries(totalSentimentPerTitle).map(
      ([mediaType, titleSentiments]) =>
        Object.entries(titleSentiments)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
    );

    const sortedSentimentAllTitles = sortedSentimentPerTitle
      .flat()
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const stats = {
      sortedMediaTypeByDuration,
      sortedMediaTypeByEntries,
      sortedMediaTypeBySentiment,
      sortedDurationPerTitle,
      sortedDurationAllTitles,
      sortedSentimentPerTitle,
      sortedSentimentAllTitles,
    };
    response.status(200).json(stats);
  }
);

module.exports = statsRouter;
