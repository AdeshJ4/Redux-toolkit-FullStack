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
        "awards": ["Academy Award for Best Visual Effects (Nomination)"],
        "trailerUrl": "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        "posterUrl": "https://example.com/poster5.jpg",
        "format": "IMAX",
        "aspectRatio": "2.39:1",
        "resolution": "1080p"
    }
    */
    const movie = await Movie.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
      director: req.body.director,
      cast: req.body.cast,
      synopsis: req.body.synopsis,
      duration: req.body.duration,
      language: req.body.language,
      country: req.body.country,
      rating: req.body.rating,
      reviews: req.body.reviews,
      boxOffice: req.body.boxOffice,
      awards: req.body.awards,
      trailerUrl: req.body.trailerUrl,
      posterUrl: req.body.posterUrl,
      format: req.body.format,
      aspectRatio: req.body.aspectRatio,
      resolution: req.body.resolution,
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
