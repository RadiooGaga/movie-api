require("dotenv").config();
const express = require('express')
const { connectDB } = require('./src/config/db');
const movieRoutes = require('./src/api/routes/movie.routes');

connectDB();
const PORT = 3001;
const server = express();
const router = express.Router();

// POST: un middleware que analiza la solicitud del cuerpo y convierte esos datos JSON
// en un objeto JavaScript accesible y los analiza de forma sencilla
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//server.use('/', router);
server.use('/movies', movieRoutes);


// todas las rutas que no tengan respuesta entrarán por aquí
server.use("*", (req, res, next) => {
    return res.status(404).json("Ruta no encontrada")
});

server.use((err, req, res, next) => {
	return res.status(err.status || 500).json(err.message || 'Error inesperado');
});


server.listen(PORT, () => {
    console.log(`aplicación corriendo en el puerto 3001: http://localhost:${PORT}`);
})