import { 
    GET_NAME, 
    GET_VIDEOGAMES, 
    GET_VIDEOGAMES_BY_ID,
    CREATE_VIDEOGAME,
    CLEAR_STATE,
    GET_BY_GENRES,
    GET_PLATFORMS,

  } from '../actions'
  
  
  const initialState = {
      videogames:{},
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
                  videogames: action.payload
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