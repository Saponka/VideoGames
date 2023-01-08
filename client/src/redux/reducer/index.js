import { 
    GET_VIDEOGAMES, 
    GET_NAME, 
    GET_VIDEOGAMES_BY_ID,
    CREATE_VIDEOGAME,
    GET_BY_GENRES,
    ORDER_BY_NAME,
    ORDEN_RATING,
    CLEAR_STATE,
    FILTER_ALL_GAMES,
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
                  allVideogames: action.payload,
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
                
        case ORDEN_RATING:
              
        
          let allRating = [...state.allVideogames] //copia del stado

          allRating  =  allRating.sort((a,b) => {
            if (a.rating <  b.rating) {//compara si viene antes 
              return action.payload === 'Min' ? -1 : 1
            }
            if(a.rating > b.rating) {//si viene despues
              return action.payload === 'Min' ? 1 : -1
            }
           return 0
          })
            return{
            ...state,
            allVideogames: allRating,
          }  

         case CLEAR_STATE: 
            return {
                ...state, videogames: [],
            }

            case FILTER_ALL_GAMES:
              
            //let allVideo =  [...state.allVideogames];
            //let allVideoGames =  state.allVideogames;
            
            //const filterDd = filterAll.filter((f) => f.id.length > 5); 
            //const filterDb = allVideo.filter((e)=> typeof e.id === 'string');

            //const filterApi = allVideo.filter(e=> typeof e.id==='number')
             
            return{

            }
            
            

              default:
                return {
                    ...state,
                }
            }
        }
        export default rootReducer