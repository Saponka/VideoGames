import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_ID = "GET_VIDEOGAMES_BY_ID";
export const GET_NAME ='GET_NAME';
export const GET_BY_GENRES = "GET_BY_GENRES";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDEN_RATING = 'ORDEN_RATING';
export const FILTER_ALL_GAMES = 'FILTER_ALL_GAMES ' ;
export const FILTER_GENRES = 'FILTER_GENRES ' ;
export const CLEAR_STATE = 'CLEAR_STATE';

export const getvideogame = () => {
  return async function (dispatch) {
    try {
      let videogames = await axios.get("https://videogames-production-74f4.up.railway.app/videogames");
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: videogames.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getName = (name) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `https://videogames-production-74f4.up.railway.app/videogames/?name=${name}`
      );
      return dispatch({
        type: GET_NAME,
        payload: response.data,
      });
    } catch (error) {
      alert(`El nombre " ${name} " no corresponde a un VideoGame existente`);
    }
  };
};
//id
export const getVideoGamesId = (id) => {
  return async function (dispatch) {
    try {
      const videogames = await axios.get(
        `https://videogames-production-74f4.up.railway.app/videogames/${id}`
      );
      return dispatch({
        type: GET_VIDEOGAMES_BY_ID,
        payload: videogames.data,
      });
    } catch (error) {
      return console.log("Im just using another Route to render this.");
    }
  };
};
//genero
export const getByGenres = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`https://videogames-production-74f4.up.railway.app/genres`);
      return dispatch({
        type: "GET_BY_GENRES",
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}; 
//create
export const createVideogame = (videogame) => {
  return async function (dispatch) {
    try {
      const { create } = await axios.post(
        "https://videogames-production-74f4.up.railway.app/videogames",videogame);
      return dispatch({
        type: "CREATE_VIDEOGAME",
        payload: create,
      });
    } catch (error) {
      return console.error(
        "No se puede crear el Videogame, por favor intente con otro nombre.",
        error.message
      );
    }
  };
};
  
//sort 
export const orderByName = (name) => {
    return {
      type: ORDER_BY_NAME,
      payload: name,
    };
  };

export const ordenRating = (payload) => {
  return {
    type: ORDEN_RATING,
    payload,
  };
};
//filters 
export const filterAll = (payload) => {
  return {
    type: FILTER_ALL_GAMES,
    payload,
  };
};

export function filtroGenres(payload) {
  return {
    type: FILTER_GENRES,
    payload,
  };
}
  //reset
export const resetState = () => {
  return { type: CLEAR_STATE };
};