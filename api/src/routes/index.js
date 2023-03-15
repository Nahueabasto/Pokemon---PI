const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Pokemon, Type } = require('../db')

const router = Router();
//const getPokemon = require("./getPokemon");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




const getPokemons = async () => {
    try {
      let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
      let pokemons = [];
  
      while (apiUrl) {
        const response = await axios.get(apiUrl);
        const data = response.data;
  
        // Obtener la información de cada pokemon
        const pokemonsData = await Promise.all(data.results.map(async (p) => {
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
        }));
  
        pokemons.push(...pokemonsData);
  
        // Setear la variable apiUrl para seguir trayendo datos
        apiUrl = data.next;
      }
  
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
