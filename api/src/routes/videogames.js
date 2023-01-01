const {Router} = require('express')
const {videogameID,AllVideoGames,infoApi,infoDB,nameApi } = require('../Controllers/videogames')
const {Videogame, Genre} = require ('../db');
const router = Router();
////
///1 y 2//get all db y api y get by name
router.get('/', async (req, res)=>{
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
  }  catch(error) {
    res.status(400).send(error.message);
}
})
//3//get by id db y api
router.get('/:id', async (req, res)=>{
  const {id} = req.params   
  try {
    //inteta buscar el id con la funcion que busca el id en api y db
      const filtroId = await videogameID(id);
      return res.status(200).send(filtroId);    
 } catch (error) {
      res.status(404).send(error);
  }
})
//4//post crear video game
router.post('/', async (req, res) => {
  const {name, released, rating, platforms, description,genre,image} = req.body;
  try {
      let newGame = await Videogame.create ({ //modelo Videogame create a new videogame
          name,
          released,
          rating,
          platforms,
          description,
          image
      });
       const relacion = await Genre.findAll({ 
          where: {name:genre}
      }); 
     
       newGame.addGenre(relacion); // agrego genero //setGenre
       return res.status(201).send(newGame);//201 created
  } catch(error) {
      res.status(400).send(error.message);
  }
})
//delete opcional
router.delete('/:id', async (req,res)=>{
  const {id} = req.params//req un id por params
  try {
         // busca por id  findByPk(id,objeto)
  const videoDelete= await Videogame.findByPk(id,{
      include:{
          model: Genre,
          attributes: ['name'],
          through: {
              attributes:[]
          }}
  })
    //si lo encuentra lo destroy 
   if(videoDelete){
        await videoDelete.destroy();
       return res.send('Videojuego eliminado!'); 
    } 
    res.status(404).send('Videojuego no encontrado')   
  }catch(error){
     res.status(400).send(error)
  } 
})  
//put opcional

///////////////////////////////
module.exports = router
 

