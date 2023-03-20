import { GET_POKEMONS } from "./Actions";

const initialState = {
    pokemons: [],
    filtered: [],
  }
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          pokemons: action.payload,
          filtered: action.payload,
        };

        default:
      return state
    }}
    export default reducer; 
