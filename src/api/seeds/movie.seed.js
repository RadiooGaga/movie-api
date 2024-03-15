const mongoose = require('mongoose');

//importamos el modelo Movie en este nuevo archivo
const Movie = require('../models/Movie');


// Conexión de nuevo a la DB e inserto de los documentos
mongoose.connect(process.env.DB_URL, {})

  .then(async () => {
    const allMovies = await Movie.find(); 

    if (allMovies.length) {
      await Movie.collection.drop(); //Si hay películas, se borra la colección
    }
  })
  .catch((err) => console.log(`Error borrando las películas: ${err}`))
  .then(async () => {
		await Movie.insertMany(movieDocuments);// metemos películas una vez vaciada la DB
	})
  .catch((err) => console.log(`Error creando las películas: ${err}`))
  .finally(() => mongoose.disconnect());
  // Desconexión final de la DB.