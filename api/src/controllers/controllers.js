const { Pokemon, Type } = require("../db");
const axios = require("axios");




// const getPokemonsAPI = async () => {
//   try {
//     let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
//     let pokemons = [];

//     while (apiUrl) {
//       const response = await axios.get(apiUrl);
//       const data = response.data;

//       // Obtener la información de cada pokemon
//       const pokemonsData = await Promise.all(data.results.map(async (p) => {
//         const pokemonData = await axios.get(p.url);
//         const types = pokemonData.data.types.map((t) => t.type.name);

//         return {
//           id: Number(pokemonData.data.id),
//           name: pokemonData.data.name,
//           image: pokemonData.data.sprites.front_default,
//           life: pokemonData.data.stats[0].base_stat,
//           attack: pokemonData.data.stats[1].base_stat,
//           defense: pokemonData.data.stats[2].base_stat,
//           speed: pokemonData.data.stats[5].base_stat,
//           height: pokemonData.data.height,
//           weight: pokemonData.data.weight,
//           types: types
//         };
//       }));

//       pokemons.push(...pokemonsData);

//       // Setear la variable apiUrl para seguir trayendo datos
//       apiUrl = data.next;
//     }

//     return pokemons;
//   } catch (err) {
//     console.log(err);
//   }
// };
const getPokemonsAPI = async () => {
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
          image: pokemonData.data.sprites.other["official-artwork"].front_default,
          life: pokemonData.data.stats[0].base_stat,
          attack: pokemonData.data.stats[1].base_stat,
          defense: pokemonData.data.stats[2].base_stat,
          speed: pokemonData.data.stats[5].base_stat,
          height: pokemonData.data.height,
          weight: pokemonData.data.weight,
          pokemonTypes: types.join(',')
        };
      }));

      // Insertar los registros en la base de datos
      await Pokemon.bulkCreate(pokemonsData);

      pokemons.push(...pokemonsData);

      // Setear la variable apiUrl para seguir trayendo datos
      apiUrl = data.next;
    }

    return pokemons;
  } catch (err) {
    console.log(err);
  }
};





const getDb = async() => {
  return await Pokemon.findAll({
      include: Type,
      attrubites: ['id', 'name'],
      through: {
          attrubites: []
      }
  })
}

const allInfo = async () => {
  try{
  const apiInfo = await getPokemonsAPI();
  const dbInfo = await getDb();
  return apiInfo.concat(dbInfo);
} catch (error) {
  return error;
};
}






module.exports = {

  allInfo,
  getPokemonsAPI,
};