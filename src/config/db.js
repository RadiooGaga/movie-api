// me traigo el paquete mongoose 

const mongoose = require('mongoose');

mongoose.set('strict', false); 
mongoose.set('strictQuery', false); 
mongoose.set('strictPopulate', false); 

// para ver si nos podemos conectar, accederemos al localhost que se crea por defecto
// en la BBDD y  entrará en la base de datos que hemos creado en MONGO Compass.

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { /*useNewUrlParser: true, useUnifiedTopology: true*/ });
        console.log('Conectado a la base de datos movie-db');
    } catch (err) {
        console.error('Error de conexión', err);
        process.exit(1)
    }
};

module.exports = { connectDB };