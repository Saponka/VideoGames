const  axios = require('axios');
const { Router } = require('express');
const {Genre} = require('../db.js')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=bc1bb0ae62664232a0e926209f30dd87`)
        const genresApi = respuesta.data.results.map(g => g.name)
        const genresDb = await Genre.findAll({atributtes:['id','name']}) //me traigo todos los generos que guarde en mi db
        //console.log('estos son los generos: ', genresApi)
        if(genresApi.length > 0){
            return res.status(200).send(genresApi);
        }else{
            genresApi.forEach( (g) => {
                Genre.bulkCreate([{name:g}])
            });
        }
        const allGenres = await Genre.findAll({atributtes:['id','name']})
         
        return res.status(200).send(allGenres);
        

    }catch(e) {
        res.status(404).send(e)
    }

})

module.exports = router;