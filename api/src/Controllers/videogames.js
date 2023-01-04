const axios = require('axios');
require('dotenv').config();
const {API_KEY, API_KEYY} = process.env;
const URL= 'https://api.rawg.io/api/games';
const URL2 =  'https://api.rawg.io/api/games?search=';
const {Videogame, Genre} = require ('../db');
///////
//SOLICITUD PARA TRAERME MIS 100 VIDEOJUEGOS//A LA API
const infoApi = async() => {
    let url = `${URL}?key=${API_KEYY}`;
    let videojuegos = [];
    try {
        for(let i=0; i<=5; i++) { //for 5 veces para la API
            const juegos = await axios.get(url) //realizo la peticion
            //en mi .data podemos encontrar dos propiedades, results que es es aquello que voy a mapear
            juegos.data.results.map(vg => { //a la respuesta/resultado lo mapeo
                videojuegos.push({ //y pusheo en mi array vacio todo aquello que mapee
                    id: vg.id,
                    name: vg.name,
                    image: vg.background_image,
                    rating : vg.rating,
                    released:vg.released,
                    platforms: vg.platforms?.map(e => e.platform.name).join(", "),
                    genres: vg.genres?.map(e => e.name).join(" | ")
                })
            });
            //y next que es donde voy a entrar para pasar a la siguente pagina.
            url = juegos.data.next
        }
        return videojuegos

    } catch(error) {
        console.log(error)
    }
};
//A MI DB//SELECT * FROM Videogame 
const infoDB = async () => {
    try {
    return await Videogame.findAll({ 
           include: [{
               model: Genre, 
               atributes: ['name'], 
               throught: { 
                   attributes: [] 
               }
           }]
       })
    } catch(error) {
        console.error(error)
    }
}
//UNO MIS DOS SOLICITUDES
const AllVideoGames = async () => {
    // guardar en variables las funciones necesarias para unir
    const apiData = await infoApi();
    const dbData = await infoDB();
    //concateno las constantes 
    //const infoTotal = [...apiData,...dbData]
    const data = dbData.concat(apiData)
    return data
}
//////////////////////////////////////
//SOLICITUD PARA MIS REQUEST POR QUERY//A MI API
const nameApi = async (name) => {
    const dataSearch = await axios.get(`${URL2}${name}&key=${API_KEYY}`) 
  
    try {
        const videogameSearch = await dataSearch.data.results.map(e => { 
            return {
                id: e.id,
                name: e.name,
                released: e.released,
                image: e.background_image,
                rating: e.rating,
                platforms: e.platforms?.map(e => e.platform.name),
                genres: e.genres?.map(e => e.name)
            }
        })
        return videogameSearch; 
    }catch(error) {
        console.error(error)
    }
}
/////////////ENDPOINT: https://api.rawg.io/api/games/{id}////////////
//SOLICITUD PARA MIS REQUEST POR PARAMS 
const idApi = async (id) => {
    try {
        const ApID = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEYY}`)
        if(ApID) {
            const vgId = await ApID.data
            const info = {
                id: vgId.id,
                name: vgId.name,
                image: vgId.background_image,
                genres: vgId.genres?.map( g => g.name),
                description: vgId.description,
                released: vgId.released,
                rating: vgId.rating,
                platforms: vgId.platforms?.map(e => e.platform.name)
            }
            return info
        } else {
            return("No hay un videojuego con ese id")
        }
    } catch(error) {
        console.error(error)
    }
}
//GET https://api.rawg.io/api/genres por genero

///////////////////////////////////////////////
//A MI DB
const idDb = async (id) => {
    try {
    return await Videogame.findByPk(id, {
        include: [{
            model: Genre, 
            atributes: ['name'], 
            throught: { 
                attributes: [] 
            }
        }]
       })
    } catch(error) {
        console.error(error)
    }
}
//UNO MIS DOS SOLICITUDES
const videogameID = async (id) => {
    const dbID = id.includes("-")
    if(dbID) { //si mi id contiene un signo "-"
        const vgDb = await idDb(id);
        return vgDb     
    } else {
        const vgApi = await idApi(id);
        return vgApi
   }
}
module.exports = {  
   AllVideoGames,
   videogameID,
   infoApi,
   infoDB,
   nameApi
  };

  