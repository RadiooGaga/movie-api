const express = require('express');

const movieRouter = require('./movie.routes');


const router = express.Router();

router.use('/movies', movieRouter)

module.exports = router;