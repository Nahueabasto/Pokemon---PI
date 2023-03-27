import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_NAME_POKEMON = 'GET_NAME_POKEMON';
export const FILTER_BY_API_DB = 'FILTER_BY_API_DB';
export const ORDER_BY = 'ORDER_BY';
export const FILTER_TYPES = 'FILTER_TYPES';
export const DETAILS = 'DETAILS';

export function getPokemons(){
    return async  function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons',{
        })
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
      try {
        const response = await axios.get('http://localhost:3001/types');
        const types = response.data;
        dispatch({ type: GET_TYPES, payload: types });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getNamePokemon(payload){
    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/pokemons?name=${payload}`);
        return dispatch({
            type: GET_NAME_POKEMON,
            payload: json.data,
        })
    }
}

export function filterByApiDb(payload) {
  return {
      type: FILTER_BY_API_DB,
      payload,
  }
}

export function orderBy(payload){
  return{
    type: ORDER_BY,
    payload,
  }
}

export function filterTypes(payload){
  return {
    type: FILTER_TYPES,
    payload,
}
}

export function getDetail(uuid){
  console.log(`Llamando a la acción getDetail con uuid: ${uuid}`);
  console.log("UUID en getDetail: ", uuid);
  return async function(dispatch) {
      try {
          const res = await axios.get(`/pokemons/${uuid}`);
          console.log("Datos obtenidos de la base de datos:", res.data);
          return dispatch({
              type: DETAILS,
              payload: res.data
          });
      } catch (err) {
          console.log(err)
      };
  };
};
