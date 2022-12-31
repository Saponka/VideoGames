import axios from 'axios'
export const GET_VIDEOGAMES ='GET_VIDEOGAMES';
export const GET_NAME ='GET_NAME';
export const GET_VIDEOGAMES_BY_ID = "GET_VIDEOGAMES_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_BY_GENRES = "GET_BY_GENRES";
export const CLEAR_STATE = 'CLEAR_STATE';


//todos
export const getvideogame= ()=>{
    return async function (dispatch){
        try {
            let videogames = await axios.get('http://localhost:3001/videogames')
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: videogames.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//name
export const getName=(name)=>{
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_NAME,
                payload: json.data
            })
        } catch (error) {
            alert(`El nombre " ${name} " no corresponde a un VideoGame existente`)
        }
    }
}
//id
export const getVideoGamesId = (id) => {
    return async function (dispatch) {
        try {
            const videogames = await axios.get(`http://localhost:3001/videogames/${id}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_ID,
                payload: videogames.data
            });
        } catch (error) {
            return console.log("Im just using another Route to render this.")
        }
    };
};
//create
export const createVideogame = (videogame) => {
    return async function( dispatch ) {

        
           /*  const create = axios.post(`http://localhost:3001/videogames`, videogame)
            return create.data */
        
         try {
            const create = await axios.post('http://localhost:3001/videogames', videogame)
            //return create
             return dispatch({
                type:"CREATE_VIDEOGAME",
                payload:create
            }) 
        } catch (error) {
            return console.error("No se puede crear el Videogame, por favor intente con otro nombre.", error.message)
        } 
    };
};
//genero
 export const getByGenres = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`http://localhost:3001/genres`);
        return dispatch({
          type: "GET_BY_GENRES",
          payload: data,
          /* .data.map(genero => genero) */
        });
      } catch (err) {
        console.error(err);
      }
    };
  }; 
  export const getPlatforms = () => {
    return async (dispatch) => {
        const url = await axios.get('http://localhost:3001/videogames/platforms')
        //console.log(url)
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: url.data
        })
    }
  };
  //filters
  //reset
export const resetState = () => {
    return {type: CLEAR_STATE}
}