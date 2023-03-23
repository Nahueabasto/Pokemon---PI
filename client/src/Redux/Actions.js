import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';

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