const { Router } = require('express');
const router = Router();
const videogamesRoute = require('./videogames');
const genresRoute = require('./genres');

///////////////////
router.use('/videogames', videogamesRoute);
router.use('/genres', genresRoute);

//----exportar---modulos--------
module.exports = router;
