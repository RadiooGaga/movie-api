const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creamos el esquema de películas
const movieSchema = new Schema(
  {
    movieName: { type: String, required: true },//La propiedad required hace que el campo sea obligatorio
    director: { type: String, required: true },
    genre:{ type: [String], required: true },
    year: {type: Number, required:true}
  },
  {
    // Esta propiedad servirá para guardar las fechas de creación y actualización de los documentos
    timestamps: true,
  }
);

// Creamos y exportamos el modelo Movie
const Movie = mongoose.model('Movie', movieSchema);
module.exports =  Movie ;