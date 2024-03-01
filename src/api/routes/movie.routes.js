const express = require('express');
const Movie = require('../models/Movie.js');
const router = express.Router();



router.get('/', async (req, res, next) => {
  try {
      const movies = await Movie.find();
      // Si encontramos las películas, las devolveremos al usuario
      return res.status(200).json(movies);
  
  } catch(err) {
    return next (err)
      // Si hay un error, enviaremos por ahora una respuesta de error.
      
  };
});


router.get('/:id', async (req, res) => {
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
});

router.get('/genre/:genre', async (req, res) => {
const {genre} = req.params;
  const normalizedGenre = genre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, "");
  console.log(genre)

try {
      const movieByGenre = await Movie.find({ genre: { $regex: new RegExp(normalizedGenre, "i") } });
  return res.status(200).json(movieByGenre);

} catch (err) {
  return res.status(500).json(err);
}
});

router.post('/create', async (req, res, next) => {
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
    return res.status(201).json(createdMovie);
  } catch (error) {
        // Lanzamos la función next con el error para que lo gestione Express
    next(error);
  }
});

router.put('/edit/:id', async (req, res, next) => {
  try {
      const { id } = req.params //Recuperamos el id de la url
      const movieModify = new Movie(req.body) //instanciamos un nuevo Movie con la información del body
      movieModify._id = id //añadimos la propiedad _id a la pelicula creada
      const movieUpdated = await Movie.findByIdAndUpdate(id , movieModify)
      return res.status(200).json(movieUpdated)//Esta pelicula que devolvemos es la anterior a su modificación
  } catch (error) {
      return next(error)
  }
});

module.exports = router;












