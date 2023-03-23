import { GET_POKEMONS, GET_TYPES } from "./Actions";

const initialState = {
    pokemons: [],
    filtered: [],
    types: [],
  }
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
          filtered: action.payload,
        };
        case GET_TYPES:
          return {
            ...state,
            types: action.payload,
          }

        default:
      return state
    }}
    export default reducer; 
