require("dotenv").config();
const express = require('express');
const mainRouter = require('./src/api/routes/movie.routes')
const { connectDB } = require('./src/config/db'); 


connectDB();
const PORT = 3001;
const server = express();


// POST: un middleware que analiza la solicitud del cuerpo y convierte esos datos JSON
// en un objeto JavaScript accesible y los analiza de forma sencilla
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.use('/', mainRouter);


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