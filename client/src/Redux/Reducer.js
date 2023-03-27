import { GET_POKEMONS, GET_TYPES, GET_NAME_POKEMON, FILTER_BY_API_DB, ORDER_BY, FILTER_TYPES, DETAILS } from "./Actions";

const initialState = {
    pokemons: [],
    filtered: [],
    types: [],
    detail: [],
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
        
  
        case ORDER_BY:
          if (action.payload === "default") {
            return {
              ...state,
              pokemons: state.pokemons,
            };
          }
          if (action.payload === "az") {
            return {
              ...state,
              pokemons: state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              }),
            };
          }
          if (action.payload === "za") {
            return {
              ...state,
              pokemons: state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              }),
            };
          }
          if (action.payload === "des") {
            return {
              ...state,
              pokemons: state.pokemons.sort(function (a, b) {
                if (a.attack > b.attack) {
                  return -1;
                }
                if (b.attack > a.attack) {
                  return 1;
                }
                return 0;
              }),
            };
          }
          if (action.payload === "asc") {
            return {
              ...state,
              pokemons: state.pokemons.sort(function (a, b) {
                if (a.attack > b.attack) {
                  return 1;
                }
                if (b.attack > a.attack) {
                  return -1;
                }
                return 0;
              }),
            };
          }
  
case FILTER_TYPES:
  const allPoke = state.filtered;
  const unifiedTypes = allPoke.map(poke => {
    if (poke.types.length > 0) {
      // Si el pokémon tiene tipos en la propiedad `types`, se toman esos tipos
      return { ...poke, allTypes: poke.types.map(type => type.name) };
    } else {
      // Si el pokémon tiene tipos en la propiedad `pokemonTypes`, se toman esos tipos
      return { ...poke, allTypes: poke.pokemonTypes.split(",") };
    }
  });
  const pokeFilter = action.payload === "All"
    ? unifiedTypes
    : unifiedTypes.filter(poke => poke.allTypes.some(type => type.toLowerCase() === action.payload.toLowerCase()));
  return {
    ...state,
    pokemons: pokeFilter
  };
case DETAILS:
  return{
    ...state,
    detail: action.payload,
  }

        default:
      return state
    }}
    export default reducer; 
