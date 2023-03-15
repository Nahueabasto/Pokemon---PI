// const axios = require("axios");
// //const { Pokemon, Type } = require('../db');

// const getPokemon = async (pokemonNameOrId) => {
//     const apiUrl = "https://pokeapi.co/api/v2/pokemon";
//     const params = isNaN(pokemonNameOrId) ? { params: { name: pokemonNameOrId } } : { params: { id: pokemonNameOrId } };
//     const response = await axios.get(apiUrl, params);
//     const pokemonInfo = {
//       id: response.data.id,
//       name: response.data.name,
//       image: response.data.sprites.front_default,
//       types: response.data.types.map(type => type.type.name),
//       abilities: response.data.abilities.map(ability => ability.ability.name),
//       stats: response.data.stats.map(stat => ({
//         name: stat.stat.name,
//         value: stat.base_stat
//       })),
//       moves: response.data.moves.map(move => move.move.name),
//     };
//     return pokemonInfo;
//   };
  
// // //Esto en controllers

// // const getPokemonUrls = async() => {
// //         let pokemonUrls = [];
// //         let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
// //         while (apiUrl) { //Lo sigue trayendo mientras la propiedad next no sea null.
// //           const response = await axios.get(apiUrl);
// //           const data = response.data;
// //           pokemonUrls.push(...data.results.map(pokemon => pokemon.url)); //pushea individualmente las URLs en lugar de todo el array
// //           apiUrl = data.next; //seteas la variable para que data tome el .next que sigue
// //         }
// //         console.log(pokemonUrls)
// //         return pokemonUrls;
// // }

// // // tengo un arreglo con ["https://pokeapi.co/api/v2/pokemon/1/"", "https://pokeapi.co/api/v2/pokemon/2/", "https://pokeapi.co/api/v2/pokemon/3/"]

// // async function getAllPokemons() {
// //     const pokemoncitos = []
// //     const pokemonsHere = await getPokemonUrls()
// //     await Promise.all(pokemonsHere.map(async (pok) => { 
// //         const response = await axios.get(pok);
// //         pokemoncitos.push(
// //         { 
// //             name: response.data.name,
// //             hp: response.data.stats[0].base_stat,
// //             attack: response.data.stats[1].base_stat,
// //             defense: response.data.stats[2].base_stat,
// //             speed: response.data.stats[5].base_stat,
// //             height: response.data.height,
// //             weight: response.data.weight,
// //         })
// //     }));
// //     console.log(pokemoncitos)
// //     return pokemoncitos;

// // }

// module.exports = {
//     getPokemon,
//   };