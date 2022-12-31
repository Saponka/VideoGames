const { Router } = require('express');
const {Genre} = require('../db.js')
//const  axios = require('axios');
const { infoGeneros } = require('../Controllers/generos')
const router = Router();

router.get('/', async (req, res)=>{
    try {
        const respuesta = await infoGeneros();
        const generosDb = await Genre.findAll();
        
        if(!generosDb.length){

            const map = respuesta.map(e=>({
                id: e.id,
                name: e.name
            }));
            
            const guardar = await Genre.bulkCreate(map)
            res.send(guardar)
        }else{
            const filtroDb = generosDb.map(e=>{
                return{
                    id: e.id,
                    name: e.name
                }
            })
            res.send(filtroDb)
        }
    }catch(error) {
        res.status(404).send(error)
    }
}) 
/* router.get('/', async (req, res) => {
    try {
        const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=bc1bb0ae62664232a0e926209f30dd87`)
        const genresApi = respuesta.data.results.map((genre)=> genre.name)
        const genresDb = await Genre.findAll({atributtes:['name']}) //me traigo todos los generos que guarde en mi db
        console.log('generos: ', genresApi)
        //console.log('generosDB: ', genresDb)

        if(genresDb.length > 0){
            return res.status(200).send(genresDb);
        }else{
            genresApi.forEach((genre)=>{
                Genre.bulkCreate([{name:genre}])
            });
            const allGenres = await Genre.findAll({atributtes:['name']})
            return res.status(200).send(allGenres);
        }
    }catch(error) {
        res.status(404).send(error)
    }
})
 */
module.exports = router;

