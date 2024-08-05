const express = require("express");
const movieRouter = express();
const {getMovie, getMovies, createMovie, updateMovie, deleteMovie} = require('../controllers/movieController');
const validateObjectId = require("../utils/validateObjectId");

// base url : http://localhost:5000/api/movies

// get Single Movie
movieRouter.get('/:id', validateObjectId, getMovie);

// get all the customers
movieRouter.get('/', getMovies);

// create Customer
movieRouter.post('/',createMovie );

//update customer
movieRouter.put('/:id', validateObjectId, updateMovie);

// delete customer
movieRouter.delete('/:id', validateObjectId, deleteMovie);


module.exports = movieRouter;