const { Router } = require('express');
const {Genre} = require('../db.js');
const router = Router();
const axios = require('axios');


router.get('/', async (req, res)=>{
    try {
        const api = await axios.get(`https://api.rawg.io/api/genres?key=5eedf5b2fac84f429c77aa6aac19ee9c`);
        let apiData = api.data.results.map(g => g.name)
        const dbData = await Genre.findAll({ atributtes: ["id", "name"] })
        
        if(dbData.length > 0) {
           return res.status(200).send(dbData);
        } else {
            apiData.forEach((genero) => {
                Genre.bulkCreate([{name: genero}])
                //por cada elemento, me creo una nueva columna en la DB
            })

            let allGenre = await Genre.findAll({atributtes: ["id", "name"]});
            return res.status(200).send(allGenre);
            //Para esta ruta utilice los datos de la api para guardar los tipos de videogames que hay
            //si la base de datos tiene elementos dentro, que los devuelva, sino
            //que los cree por medio de un bulkCreate dado el name de cada tipo de game de la api
        }
        
    } catch (error) {
        res.status(404).send(error);
    }
}
);
module.exports = router;
