const mongoose = require("mongoose");
const Joi = require("joi");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: Date
    },
    genre: {
      type: [String]
    },
    director: {
      type: String,
      trim: true,
    },
    cast: {
      type: [String],
      default: [],
    },
    synopsis: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number, // duration in minutes

    },
    language: {
      type: String,
      trim: true,
    },
    country: {
      type: String,

      trim: true,
    },
    rating: {
      type: String,
      trim: true,
    },
    reviews: {
      type: [
        {
          reviewer: String,
          reviewText: String,
          rating: Number,
          date: Date,
        },
      ],
      default: [],
    },
    boxOffice: {
      type: Number,
    },
    awards: {
      type: [String],
      default: [],
    },
    trailerUrl: {
      type: String,
      trim: true,
    },
    posterUrl: {
      type: String,
      trim: true,
    },
    format: {
      type: String,
      trim: true,
    },
    aspectRatio: {
      type: String,
      trim: true,
    },
    resolution: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);



function validateMovie(movie) {
  const joiSchema = Joi.object({
    title: Joi.string(),
    releaseDate: Joi.date(),
    genre: Joi.array().items(Joi.string()),
    director: Joi.string(),
    cast: Joi.array().items(Joi.string()),
    synopsis: Joi.string(),
    duration: Joi.number(),
    language: Joi.string(),
    country: Joi.string(),
    rating: Joi.string(),
    reviews: Joi.array().items(
      Joi.object({
        reviewer: Joi.string(),
        reviewText: Joi.string(),
        rating: Joi.number(),
        date: Joi.date(),
      })
    ),
    boxOffice: Joi.number(),
    awards: Joi.array().items(Joi.string()),
    trailerUrl: Joi.string().uri(),
    posterUrl: Joi.string().uri(),
    format: Joi.string(),
    aspectRatio: Joi.string(),
    resolution: Joi.string(),
  });

  return joiSchema.validate(movie);
}

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie, movieSchema, validateMovie };
