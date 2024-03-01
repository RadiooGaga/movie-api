require("dotenv").config();
const express = require('express')
const { connectDB } = require('./src/config/db');
//const Movie = require('../models/Movie.js');
const movieRoutes = require('./src/api/routes/movie.routes');

connectDB();
const PORT = 3001;
const server = express();
const router = express.Router();

// POST: esto debe estar aquí. req.body no contendrá los datos que hemos enviado al servidor
// porque no estamos utilizando ningún middleware para "parsear" la información. Para ello, 
//añadiremos estas 2 líneas en el archivo index.js antes de añadir las rutas.
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//server.use('/', router);
server.use('/movies', movieRoutes);


// todas las rutas que no tengan respuesta entrarán por aquí
server.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
});

server.use((err, req, res, next) => {
	return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

/* utilizamos nuestro servidor para ponerlo a escuchar con el método listen, le tenemos
que pasar un puerto en el primer parámetro y un callback con la función a ejecutar cuando 
se ponga a escuchar.*/

server.listen(PORT, () => {
    console.log(`aplicación corriendo en el puerto 3001: http://localhost:${PORT}`);
})