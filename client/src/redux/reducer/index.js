import {
  GET_VIDEOGAMES,
  GET_NAME,
  GET_VIDEOGAMES_BY_ID,
  GET_BY_GENRES,
  CREATE_VIDEOGAME,
  ORDER_BY_NAME,
  ORDEN_RATING,
  CLEAR_STATE,
  FILTER_ALL_GAMES,
  FILTER_GENRES,
} from "../actions";

const initialState = {
  videogames: {},
  allVideogames: [],
  genres: [],
  createdvideogames: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //Get
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
      };
    case GET_NAME:
      return {
        ...state,
        allVideogames: action.payload,
      };
    //Detalle
    case GET_VIDEOGAMES_BY_ID: 
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_BY_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    //Create
    case CREATE_VIDEOGAME:
      return {
        ...state,
        createdvideogames: action.payload,
      };

    //Order
    case ORDER_BY_NAME:
      let allGames = state.allVideogames;

      let sortName =
        action.payload === "asc"
          ? allGames.sort((a, b) => {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })
          : allGames.sort((a, b) => {
              return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
      return {
        ...state,
        allVideogames: sortName,
      };

    case ORDEN_RATING:
      let allRating = [...state.allVideogames]; //copia del stado

      allRating = allRating.sort((a, b) => {
        if (a.rating < b.rating) {
          //compara si viene antes
          return action.payload === "Min" ? -1 : 1;
        }
        if (a.rating > b.rating) {
          //si viene despues
          return action.payload === "Min" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        allVideogames: allRating,
      };

    ///Reset
    case CLEAR_STATE:
      return {
        ...state,
        videogames: [],
      };

    //Filters
    case FILTER_ALL_GAMES:
      const allVideoGames = state.allVideogames;
      const filterDb = allVideoGames.filter((f) => typeof f.id === "string");
      const filterApi = allVideoGames.filter((f) => typeof f.id === "number");
      return {
        ...state,
        allVideogames: action.payload === "all"
        ? state.allVideogames : action.payload === 'db'
        ? filterDb : filterApi 
      };
        /*  case FILTRO_GENRES:
          const genresInfo = state.allVideogames
          const filtroGenero = genresInfo.filter(video => 
            video.genres?.some(videito => videito.toLowerCase() === action.payload.toLowerCase()))
          return{
              ...state,
              videogames: action.payload === "All" ? state.allVideogames : filtroGenero
          } */
           case FILTER_GENRES:
            let aux = [];
            if(action.payload) {
                aux = state.allVideogames.filter(e => {
                    if(e.genres.length === 0){
                        return e.genres
                    }
                    /* else if(e.genres.some(e => e.name === action.payload)) {
                        return e.genres.map(el => el.name)
                    } */ else {
                        return e.genres.includes(action.payload)
                    }
                })
            } else {
                aux = state.allVideogames
            }

            return {
                ...state,
                allVideogames: aux,
            } 
    //Default
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
/* 
          const AllGames = state.videogames;
          let filterGames = [];
    
                switch(action.payload) {
                    case 'api': filterGames = AllGames.filter(el => typeof (el.id) === 'number'); 
                    break;
                    case 'db': filterGames = AllGames.filter(el => isNaN(el.id));
                     break;
                    default: filterGames = AllGames; 
                    break;
                }
                return {
                    ...state,
                    allVideogames: filterGames
                };
                } */

