import { 
    GET_VIDEOGAMES, 
    GET_NAME, 
    GET_VIDEOGAMES_BY_ID,
    CREATE_VIDEOGAME,
    GET_BY_GENRES,
    GET_PLATFORMS,
    ORDER_BY_NAME,
    CLEAR_STATE,

  } from '../actions'
  
  
  const initialState = {
      videogames:[],
      allVideogames:[],
      genres: [],
      createdvideogames:[]
  }
  
  function rootReducer (state = initialState, action){
      switch(action.type){
              
          case GET_VIDEOGAMES:
              return{
                  ...state,
                  allVideogames: action.payload, 
              }
          case GET_NAME:
              return{
                  ...state,
                  allVideogames: action.payload
              }
          case GET_VIDEOGAMES_BY_ID: // detalle
            return {
                ...state,
                videogames: action.payload
            };
          case CREATE_VIDEOGAME:
            return {
                ...state,
                createdvideogames: action.payload
            }
          case GET_BY_GENRES:
                return {
                    ...state,
                    genres: action.payload
                }
          case GET_PLATFORMS:
                    return {
                        ...state,
                        platforms: action.payload
                    }
                     
          
        case ORDER_BY_NAME: 
                let allGames = state.allVideogames;
                let sortName = action.payload === 'asc' ?
                allGames.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                }) :
                allGames.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
                return {
                ...state,
                allVideogames: sortName
                };  

         case CLEAR_STATE: 
            return {
                ...state, videogames: [],
            }
              default:
                return {
                    ...state,
                }
            }
        }
        export default rootReducer