const mongoose = require("mongoose");
const { Movie, validateMovie } = require("../models/movieModel");
const handleError = require("../utils/handleError");

const pageSize = 10;

/*
    1. @desc : Get All Movies
    2. @route GET : /api/movies?pageNumber=2&pageSize=5
    3. @access public
*/

// Pagination: /movies?pageNumber=2&pageSize=5
// Filtering: /movies?filterGenre=Action
// Searching: /movies?search=Inception
// Sorting: /movies?sortBy=releaseDate&sortOrder=desc
// Combined: /movies?pageNumber=1&pageSize=5&search=Inception&filterGenre=Action&sortBy=releaseDate&sortOrder=desc

// const getMovies = async (req, res) => {
//   try {
//     const {
//       pageNumber = '1',
//       pageSize = '10',
//       sortBy = 'title',
//       sortOrder = 'asc',
//       search = '',
//       filterGenre = '',
//       filterDirector = '',
//     } = req.query;

//     const parsedPageNumber = parseInt(pageNumber, 10);
//     const parsedPageSize = parseInt(pageSize, 10);

//     const searchQuery = search
//       ? {
//           $or: [
//             { title: { $regex: search, $options: 'i' } },
//             { synopsis: { $regex: search, $options: 'i' } },
//             { director: { $regex: search, $options: 'i' } },
//           ],
//         }
//       : {};

//     const filterQuery = {
//       ...(filterGenre && { genre: filterGenre }),
//       ...(filterDirector && { director: filterDirector }),
//     };

//     const sortQuery = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

//     const count = await Movie.countDocuments({ ...searchQuery, ...filterQuery });
//     const movies = await Movie.find({ ...searchQuery, ...filterQuery })
//       .skip((parsedPageNumber - 1) * parsedPageSize)
//       .limit(parsedPageSize)
//       .sort(sortQuery);

//     return res.status(200).json({
//       status: 'success',
//       count,
//       data: movies,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: 'error',
//       message: error.message,
//     });
//   }
// };

const getMovies = async (req, res) => {
  try {
    const { pageNumber = 1, pageSize = 10 } = req.query;

    const count = await Movie.countDocuments();
    const movies = await Movie.find()
      .skip((parseInt(pageNumber) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize));

    return res.status(200).json({
      status: "success",
      count,
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

/*
    1. @desc : Get Single Movie
    2. @route GET : /api/movies/:id
    3. @access public
*/

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res
        .status(404)
        .send(`The movie with given id ${req.params.id} not found`);
    }

    return res.status(200).json({ status: "success", data: movie });
  } catch (error) {
    return handleError({ res, error, status: 500 });
  }
};

/*
    1. @desc : Create Movie
    2. @route POST : /api/movies
    3. @access public
*/
const createMovie = async (req, res) => {
  console.log('movie data : ', req.body);
  
  try {
    const { error } = validateMovie(req.body);
    if (error) {
      return handleError({
        res,
        message: error.details[0].message,
        status: 400,
      });
    }

    /*
    {
        "title": "Avengers: Endgame",
        "releaseDate": "2019-04-26",
        "genre": ["Action", "Adventure", "Drama"],
        "director": "Anthony Russo, Joe Russo",
        "cast": ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
        "synopsis": "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        "duration": 181,
        "language": "English",
        "country": "USA",
        "rating": "PG-13",
        "reviews": [
          {
            "reviewer": "Charlie White",
            "reviewText": "A fitting and emotional conclusion to the Infinity Saga.",
            "rating": 5,
            "date": "2019-04-27"
          }
        ],
        "boxOffice": 2797800564,
        "award": ["Academy Award for Best Visual Effects (Nomination)"],
        "trailerUrl": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        "posterUrl": "https://example.com/poster5.jpg",
        "format": "IMAX",
        "aspectRatio": "2.39:1",
        "resolution": "1080p"
    }
    */
    const movie = await Movie.create({
      title: req.body.title,                       // String (required, trim)
      releaseDate: req.body.releaseDate,           // Date
      genres: Array.isArray(req.body.genres) ? req.body.genres : [],  // Array of strings
      directors: Array.isArray(req.body.directors) ? req.body.directors : [], // Required, array of strings
      cast: Array.isArray(req.body.cast) ? req.body.cast : [],     // Required, array of strings
      awards: Array.isArray(req.body.awards) ? req.body.awards : [],  // Array of strings
      synopsis: req.body.synopsis,                 // String (trim)
      duration: req.body.duration,                 // Number (duration in minutes)
      language: req.body.language,                 // String (trim)
      country: req.body.country,                   // String (trim)
      rating: req.body.rating,                     // String (trim)
      boxOffice: req.body.boxOffice,               // Number
      reviews: Array.isArray(req.body.reviews) ? req.body.reviews.map(review => ({
        reviewer: review.reviewer,
        reviewText: review.reviewText,
        rating: review.rating,
        date: review.date,
      })) : [],                                     // Array of review objects
      trailerUrl: req.body.trailerUrl,             // String (trim)
      posterUrl: req.body.posterUrl,               // String (trim)
      format: req.body.format,                     // String (trim)
      aspectRatio: req.body.aspectRatio,           // String (trim)
      resolution: req.body.resolution,             // String (trim)
    });

    return res.status(201).json({ status: "success", data: movie });
  } catch (error) {
    return handleError({ res, error, status: 500 });
  }
};

/*
    1. @desc : Update Movie
    2. @route UPDATE : /api/movies/:id
    3. @access public
*/
const updateMovie = async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error)
      return handleError({
        res,
        message: error.details[0].message,
        status: 400,
      });

    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!movie) {
      return handleError({
        res,
        message: `The Movie with given id ${req.params.id} not found`,
        status: 400,
      });
    }

    return res.status(200).json({ status: "success", data: movie });
  } catch (error) {
    return handleError({ res, error, status: 500 });
  }
};

/*
    1. @desc : delete Movie
    2. @route DELETE : /api/movies/:id
    3. @access public
*/
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return handleError({
        res,
        message: `The Movie with given id ${req.params.id} not found`,
        status: 400,
      });
    }

    return res.status(200).json({ status: "success", data: movie });
  } catch (err) {
    return handleError({ res, error, status: 500 });
  }
};

module.exports = {
  getMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
