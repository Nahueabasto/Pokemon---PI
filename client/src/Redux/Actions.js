import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_NAME_POKEMON = 'GET_NAME_POKEMON';
export const FILTER_BY_API_DB = 'FILTER_BY_API_DB';
export const ORDER_BY = 'ORDER_BY';
export const FILTER_TYPES = 'FILTER_TYPES';
export const GET_POKE_DETAIL = 'GET_POKE_DETAIL';
export const POST_POKEMON = 'POST_POKEMON';
//export const DELETE_POKEMON = 'DELETE_POKEMON';


export function getPokemons(){
    return async  function(dispatch){
        var json = await axios.get('/pokemons',{
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
        const response = await axios.get('/types');
        const types = response.data;
        dispatch({ type: GET_TYPES, payload: types });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getNamePokemon(payload){
    return async function (dispatch){
        var json = await axios.get(`/pokemons?name=${payload}`);
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
  return async function(dispatch){
    try {
        // Validar que el uuid sea una cadena de caracteres válida
        if (typeof uuid !== "string" || uuid.length === 0) {
          throw new Error("El uuid debe ser una cadena de caracteres no vacía");
        }

        let pokeDetail = await axios.get(`/pokemons/${uuid}`)
        
        return dispatch({
            type: 'GET_POKE_DETAIL',
            payload: pokeDetail.data
        });
    } catch(e){
        console.log(e)
    }
  }
}

export function postPokemon(payload){
  return async function(dispatch){
      try{
      await axios.post('/pokemons', payload)
      return dispatch({
          type: POST_POKEMON,
            });
       } catch (error) {
     alert("Post failed");
       }
   };
  }


  // export function deletePokemon(uuid){
  //   return async function(dispatch){
  //     try{
  //       const perro = await axios.delete(`http://localhost:3001/pokemons/${uuid}`)
  //       return dispatch ({
  //         type: DELETE_POKEMON,
  //         payload: pokemon,
  //       });
  //     }catch(error){
  //       alert(error)
  //     }
  //   };
  // };

