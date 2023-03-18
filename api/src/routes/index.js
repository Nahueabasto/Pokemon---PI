const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Pokemon, Type } = require('../db')
const {
  
 getPokemonsAPI,
  allInfo,
  //getPokemonById,
} = require("../controllers/controllers");

//const { Pokemon, Type } = require("../db");

const router = Router();
//const getPokemon = require("./getPokemon");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/pokemons', async (req, res, next) => {
  const {name} = req.query;
  const allPokemon = await allInfo();
  if(name) {
      const byName = await allPokemon.filter(i => i.name.toLowerCase().includes(name.toLocaleLowerCase()))
      byName.length ? 
      res.status(200).send(byName) :
      res.status(404).send("No hay personaje con ese nombre");
  } else {
      res.status(200).send(allPokemon)
  };
});

router.get('/:idPokemon', async (req, res) => {
  try {
    const { idPokemon } = req.params;
    const pokemon = await allInfo(idPokemon);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/pokemons/:idPokemon", async (req, res) => {
  const id = parseInt(req.params.idPokemon);

  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json("El ID proporcionado no es un número entero válido");
  }

  try {
    const pokemonDb = await Pokemon.findOne({
      where: {
        id: id,    
      },
      include: {
        model: Type,
        through:{
          attributes: [],
        },
        attributes: ["name"],
      },
    });

    if (pokemonDb) {
      return res.json(pokemonDb);
    } else {
      const pokeApi = await getPokemonsAPI();
      const foundPokemon = pokeApi.find((el) => el.id === id);

      if (foundPokemon) {
        return res.json(foundPokemon);
      } else {
        return res.status(404).json("El id no existe");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error interno del servidor");
  }
});

// router.get("/types", async (req, res) => {
//   const {data} = await axios.get('https://pokeapi.co/api/v2/type');
//   const typess = data.map(el => el.types)
//   const dbType = typess.flat()
//   dbType.forEach(async el => {
//     await Type.findOrCreate({
//       where: {
//         name: el
//       }
//     });
//   });
//   const allTypes = await Type.findAll({
//     attributes: ['name']
//   });
//   const typeNames = allTypes.map(types => types.name);
//   return res.status(200).send(typeNames);
// });

router.get("/types", async (req, res) => {
  const pokemons = await getPokemonsAPI();
  const typesSet = new Set();
  pokemons.forEach(pokemon => {
    pokemon.types.forEach(type => {
      typesSet.add(type);
    });
  });
  const typesArray = Array.from(typesSet);
  typesArray.forEach(async (el) => {
    await Type.findOrCreate({
      where: {
        name: el,
      },
    });
  });
  const allTypes = await Type.findAll({
    attributes: ["name"],
  });
  const typeNames = allTypes.map((type) => type.name);
  return res.status(200).send(typeNames);
});







module.exports = router;
