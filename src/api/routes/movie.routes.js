const express = require('express');
const Movie = require('../models/Movie.js');
const { getAllMovies, getMoviesById, getMoviesByGenre, getMoviesByDirector, createNewMovie, editUpdateMovieById, deleteMovieById } = require('../controllers/movieControllers.js');
const router = express.Router();


// Traer todas las películas
router.get('/movies', getAllMovies);


//Traer película por ID
router.get('/:id', getMoviesById);

//Traer película por género
router.get('/genre/:genre', getMoviesByGenre);


//Traer película por director
router.get('/director/:director', getMoviesByDirector);


//Crear nueva película
router.post('/create', createNewMovie);

//Actualizar/editar película por ID
router.put('/edit/:id', editUpdateMovieById);

//Borrar película por ID
router.delete('/:id', deleteMovieById);

module.exports = router;












