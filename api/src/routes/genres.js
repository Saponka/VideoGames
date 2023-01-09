const { Router } = require('express');
const {Genre} = require('../db.js');
const router = Router();
const axios = require('axios');


router.get('/', async (req, res)=>{
    try {
        const api = await axios.get(`https://api.rawg.io/api/genres?key=bc1bb0ae62664232a0e926209f30dd87`);
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
/*     try {
        const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=bc1bb0ae62664232a0e926209f30dd87`)
       
        const genresApi = await respuesta.data.results.map(g => g.name)
        //console.log('estos son los generos: ', genresApi)

        genresApi.map(e => Genres.findOrCreate({ //lo uso para guardar los generos que me traje de la API en la base de datos
            where: {name: e} //
        }))

        const allGenres = await Genres.findAll() //me traigo todos los generos que guarde en mi db
        res.json(allGenres)

    }catch(e) {
        next(e)
    } */
 /*  const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=bc1bb0ae62664232a0e926209f30dd87`)
        const generosDb = await Genre.findAll();

        if(!generosDb.length){
              const map = respuesta.map(e=>({
                id: e.id,
                name: e.name
            }));   
            const guardar = await Genre.bulkCreate(map);
            res.status(200).send(guardar) 
        }else{
           
             const filtroDb = generosDb.map(e=>{
                return{
                    id: e.id,
                    name: e.name
                }
            })
            res.status(200).send(filtroDb) 
        }
    }catch(error) {
        res.status(404).send(error)
    }  */
    /*    try {
        const api = await axios.get('https://pokeapi.co/api/v2/type');
        let apiData = api.data.results.map(type => type.name)
        const dbData = await Type.findAll({ atributtes: ["id", "name"] })
        
        if(dbData.length > 0) {
           return res.status(200).send(dbData);
        } else {
            apiData.forEach((type) => {
                Type.bulkCreate([{name: type}])
                //por cada elemento, me creo una nueva columna en la DB
            })

            const allTypes = await Type.findAll({atributtes: ["id", "name"]});
            return res.status(200).send(allTypes);
            //Para esta ruta utilice los datos de la api para guardar los tipos de Pokemon que hay
            //si la base de datos tiene elementos dentro, que los devuelva, sino
            //que los cree por medio de un bulkCreate dado el name de cada tipo de pokemon de la api
        }
        
    } catch (error) {
        res.status(404).send("There's no Pokemons with that Type");
    } */
   