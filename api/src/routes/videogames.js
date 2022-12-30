const {Router} = require('express')
const {videogameID,AllVideoGames,infoApi,infoDB,nameApi } = require('../Controllers/videogames')
const {Videogame, Genre} = require ('../db');
const router = Router();
////
///1 y 2//get all db y api y get by name
router.get('/', async (req, res, next)=>{
  try {
    const {name} = req.query;//name por query
    let juegos = await AllVideoGames();
    //si hay match de name
      if(name){
            const videogameApi = await nameApi(name);
            const videogameDB =  await infoDB();
            //hago un filter para buscar el name en la db 
            let gamesDB = videogameDB.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            //unir las 2 busquedas 
            let videogameName = gamesDB.concat(videogameApi);
            //hay match response todos los match sino 404
          if(videogameName) res.status(200).send(videogameName)
          else  res.status(404).send('El Video Juego no existe')
      }else{
       
          res.send(juegos);
      }
  } catch (error) {
      next(error);
  }
})
//3//get by id db y api
router.get('/:id', async (req, res, next)=>{
  const {id} = req.params   
  try {
    //inteta buscar el id con la funcion que busca el id en api y db
      const filtroId = await videogameID(id);
      return res.send(filtroId);    
 } catch (error) {
      next(error);
  }
})
//4//post crear video game
router.post('/', async (req, res, next) => {
  const {name, released, rating, platforms, description,genres} = req.body;
  try {
      let newGame = await Videogame.create ({ //create el objeto con los atributos de mi new videogame
          name,
          released,
          rating,
          platforms,
          description
      });
      const relacion = await Genre.findAll({ //en generos, buscame todos aquellos  //donde
          where: {name:genres}
      })
      newGame.addGenre(relacion); //a mi juego creado, le agrego algun genero
      res.send(newGame);
  } catch(error) {
      next(error);
  }
})
//5//get genres
//delete opcional
router.delete('/:id', async (req,res,next)=>{
  const {id} = req.params//req un id por params
  try {
    //lo buscamos por id usando findByPk(2 parametros, id y un objeto)
  const videoDelete= await Videogame.findByPk(id,{
      include:{
          model: Genre,
          attributes: ['name'],
          through: {
              attributes:[]
          }}
  })
  //platforms
  router.get('/platforms', async (req, res, next) => {
        
    try {
        const all = await infoApi();
        const allPlatforms = [];
        all.map(g => g.platforms.map(p => {
            if(!allPlatforms.includes(p)) {
                allPlatforms.push(p)
            }
        }))
    
        allPlatforms.length ? res.status(200).json(allPlatforms) : res.status(404).send('Error')

        }catch(e) {
            next(e)
        }
    })
  //si lo matchea entonces lo elimina si no 404 
 /*  if(videoDelete){
      await videoDelete.destroy();
      return res.send('Videojuego eliminado!')
  } */
  res.status(404).send('Videojuego no encontrado')
 } catch (error) {
     next(error)
 }
})
//put opcional
router.put('/editar')
///////////////////////////////
module.exports = router
