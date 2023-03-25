import { GET_POKEMONS, GET_TYPES, GET_NAME_POKEMON, FILTER_BY_API_DB } from "./Actions";

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
        case GET_NAME_POKEMON:
          return{
            ...state,
            pokemons: action.payload,
          }

          ///Luuu
        case FILTER_BY_API_DB:
          if (action.payload === 'all') {
            return {
              ...state,
              pokemons: state.filtered,
            };
          } else if (action.payload === 'created') {
            const filteredPokemons = state.filtered.filter(pokemon => pokemon.pokemonTypes === null);
            console.log(filteredPokemons);
            return {
              ...state,
              pokemons: filteredPokemons,
            };
          } else if (action.payload === 'api') {
            const filteredPokemons = state.filtered.filter(pokemon => typeof pokemon.pokemonTypes === "string");
            console.log(filteredPokemons);
            return {
              ...state,
              pokemons: filteredPokemons,
            };
          }
          
          // if (action.payload === 'created') {
          //   const filteredPokemons = state.pokemons.filter(pokemon => pokemon.pokemonTypes === null);
          //   console.log(filteredPokemons);
          //   return {
          //     ...state,
          //     pokemons: filteredPokemons,
          //   };
          // }
          
          


        default:
      return state
    }}
    export default reducer; 
