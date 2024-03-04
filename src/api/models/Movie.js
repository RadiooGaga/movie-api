const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const movieSchema = new Schema(
  {
    movieName: { type: String, required: true },
    director: { type: String, required: true },
    genre:{ type: [String], required: true },
    year: {type: Number, required:true}
  },
  {
    
    timestamps: true,
  }
);

// Creamos y exportamos el modelo Movie
const Movie = mongoose.model('Movie', movieSchema);
module.exports =  Movie ;