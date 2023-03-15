const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Pokemon, Type } = require('../db')

const router = Router();
//const getPokemon = require("./getPokemon");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const getPokemonUrls = async() => {
//     let pokemonUrls = [];
//     let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
//     while (apiUrl) { //Lo sigue trayendo mientras la propiedad next no sea null.
//       const response = await axios.get(apiUrl);
//       const data = response.data;
//       pokemonUrls.push(...data.results.map(pokemon => pokemon.url)); //pushea individualmente las URLs en lugar de todo el array
//       apiUrl = data.next; //seteas la variable para que data tome el .next que sigue
//     }
//     console.log(pokemonUrls)
//     return pokemonUrls;
// }

// // tengo un arreglo con ["https://pokeapi.co/api/v2/pokemon/1/"", "https://pokeapi.co/api/v2/pokemon/2/", "https://pokeapi.co/api/v2/pokemon/3/"]

// async function getAllPokemons() {
// const pokemoncitos = []
// const pokemonsHere = await getPokemonUrls()
// await Promise.all(pokemonsHere.map(async (pok) => { 
//     const response = await axios.get(pok);
//     pokemoncitos.push(
//     { 
//         name: response.data.name,
//         hp: response.data.stats[0].base_stat,
//         attack: response.data.stats[1].base_stat,
//         defense: response.data.stats[2].base_stat,
//         speed: response.data.stats[5].base_stat,
//         height: response.data.height,
//         weight: response.data.weight,
//     })
// }));
// console.log(pokemoncitos)
// return pokemoncitos;

// }
  
// router.get('/pokemons', async (req, res, next) => {
//     try {
//       const pokemonis = await getAllPokemons()
//       console.log(pokemonis)
      
//       if (pokemonis.length === 0) {
//           res.status(404).send('No se encontraron pokemones.');
//         } else {
//         console.log(pokemonis)
//         res.status(200).send(pokemonis);
//       }
//     } catch (error) {
//       next(error);
//     }
//   });


const getPokemons = async () => {
    try {
      const allPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");
  
      const pokemons = await Promise.all(
        allPokemons.data.results.map(async (p) => {
          const pokemonData = await axios.get(p.url);
          const types = pokemonData.data.types.map((t) => t.type.name);
          return {
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            image: pokemonData.data.sprites.front_default,
            life: pokemonData.data.stats[0].base_stat,
            attack: pokemonData.data.stats[1].base_stat,
            defense: pokemonData.data.stats[2].base_stat,
            speed: pokemonData.data.stats[5].base_stat,
            height: pokemonData.data.height,
            weight: pokemonData.data.weight,
            types: types
          };
        })
      );
      return pokemons;
    } catch (err) {
      console.log(err);
    }
  };

  router.get('/pokemons', async (req, res, next) => {
        try {
          const pokemonis = await getPokemons()
          console.log(pokemonis)
          
          if (pokemonis.length === 0) {
              res.status(404).send('No se encontraron pokemones.');
            } else {
            console.log(pokemonis)
            res.status(200).send(pokemonis);
          }
        } catch (error) {
          next(error);
        }
      });
    



module.exports = router;
