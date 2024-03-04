const mongoose = require('mongoose');

//importamos el modelo Movie en este nuevo archivo
const Movie = require('../models/Movie');

const movies = [
    {   
        _id: "1",
        movieName: "Pulp Fiction",
        director: "Quentin Tarantino",
        genre: ["comedia-negra", "crimen"],
        year: "1994"
    },
    {
        _id: "2",
        movieName: "Funny Games",
        director: "Michael Haneke",
        genre: "terror",
        year: "1997"
    },
    {
        _id: "3",
        movieName: "Coherence",
        director: "James Ward Byrkit",
        genre: "ciencia ficción",
        year: "2013"
    },
    {
        _id: "4",
        movieName: "Climax",
        director: "Gaspar Noé",
        genre: "thriller psicológico",
        year: "2018"
    },
    {
        _id: "5",
        movieName: "Un Dios Salvaje",
        director: "Roman Polanski",
        genre: "comedia negra",
        year: "2011"
    },
    {
        _id: "6",
        movieName: "Jo Jo Rabbit",
        director: "Taika Waititi",
        genre: ["sátira", "comedia negra","bélico"],
        year: "2011"
    },
    {
        _id: "7",
        movieName: "La mosca",
        director: "David Cronenberg",
        genre: "ciencia ficción",
        year: "1986"
    },
    {
        _id: "8",
        movieName: "Mystic River",
        director: "Clint Eastwood",
        genre: "drama",  
        year:"2003"    
    },
    {
        _id: "9",
        movieName: "Los otros",
        director: "Alejandro Amenábar",
        genre: "terror",  
        year:"2001"    
    },
    {
        _id: "10",
        movieName: "El piano",
        director: "Jane Campion",
        genre: "drama",  
        year:"1993"    
    },
    {
        _id: "11",
        movieName: "La soga",
        director: "Alfred Hitchcock",
        genre: ["crimen", "thriller"],  
        year:"1948"    
    },
    {
        _id: "12",
        movieName: "Los pájaros",
        director: "Alfred Hitchcock",
        genre: "terror",  
        year:"1963"    
    },
    {
        _id: "13",
        movieName: "El resplandor",
        director: "Stanley Kubrick",
        genre: ["terror", "drama"],
        year:"1980"    
    }
]

const movieDocuments = movies.map(movie => new Movie(movie));


// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose.connect(process.env.DB_URL, {})
  .then(async () => {
		// Utilizando Movie.find() obtendremos un array con todas las películas de la db
    const allMovies = await Movie.find();
		
		// Si existen películas previamente, dropearemos la colección
    if (allMovies.length) {
      await Movie.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error borrando las películas: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de las películas, usaremos el array movieDocuments
		// para llenar nuestra base de datos con todas los películas.
		await Movie.insertMany(movieDocuments);
	})
  .catch((err) => console.log(`Error creando las películas: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());