const Movie = require('../models/Movie');

// Traer todas las películas
const getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies);
    
    } catch(err) {
      return next (err)  
    };
};

//Traer película por ID
const getMoviesById = async (req, res) => {
    const id = req.params.id;
    try {
      const movie = await Movie.findById(id);
      if (movie) {
        return res.status(200).json(movie);
      } else {
        return res.status(404).json('No hay películas con este id');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
};

//Traer película por género
const getMoviesByGenre = async (req, res) => {
    const {genre} = req.params;
      const normalizedGenre = genre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, "");
      console.log(genre)
    
    try {
          const movieByGenre = await Movie.find({ genre: { $regex: new RegExp(normalizedGenre, "i") } });
      return res.status(200).json(movieByGenre);
    
    } catch (err) {
      return res.status(500).json(err);
    }
};


//Traer película por director
const getMoviesByDirector = async (req, res) => {
    const {director} = req.params;
      const normalizedDirector = director.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, "");
      console.log(director)
    
    try {
          const movieByDirector = await Movie.find({ director: { $regex: new RegExp(normalizedDirector, "i") } });
      return res.status(200).json(movieByDirector);
    
    } catch (err) {
      return res.status(500).json(err);
    }
    
};

//Crear nueva película
const createNewMovie = async (req, res, next) => {
    try {
      // Crearemos una instancia de movie con los datos enviados
      const newMovie = new Movie({
        movieName: req.body.movieName,
        director: req.body.director,
        genre: req.body.genre,
        year: req.body.year
      })
  
      // Guardamos la película en la DB
      const createdMovie = await newMovie.save();
      return res.status(201).json({movie: createdMovie, message: 'película creada!'});
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
};


//Actualizar/editar película por ID
const editUpdateMovieById = async (req, res, next) => {
    try {
        const { id } = req.params 
        const movieModify = new Movie(req.body) 
        movieModify._id = id
        const movieUpdated = await Movie.findByIdAndUpdate(id , movieModify, { new: true })
        return res.status(200).json({movie: movieUpdated, message: 'película actualizada!'})
    } catch (error) {
        return next(error)
    }
  
};

//Borrar película por ID
const deleteMovieById = async (req,res, next) => {
    try {
      const { id } = req.params 
      await Movie.findByIdAndDelete(id);
      return res.status(200).json(({ message: 'película borrada!'}));
    } catch (error) {
      return next(error);
    }
};

module.exports = {
    getAllMovies,
    getMoviesById,
    getMoviesByGenre,
    getMoviesByDirector,
    createNewMovie,
    editUpdateMovieById,
    deleteMovieById
}