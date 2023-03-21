//Luu, al final no pude solucionar todo, me salieron unos errores con el id que mañana te tengo que preguntar, y te cuento despues bien todo, si me salio ya guardarme todo en la base de datos, cosa que va a ser mucho mas rapido para renderizar :D


const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const { Pokemon, Type, Pokemon_Type, } = require('../db')
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
  try {
  const allPokemon = await Pokemon.findAll({
    include: Type
  });
  const result = name
      ? allPokemon.filter((el) =>
          el.name.toString().toLowerCase().includes(name.toLowerCase())
        )
      : allPokemon;

    if (result.length === 0) {
      res.status(404).send('No se encontraron Pokemon con ese nombre.');
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

// router.get('/pokemons', async (req, res, next) => {
//   const {name} = req.query;
//   const allPokemon = await allInfo();
//   if(name) {
//       const byName = await allPokemon.filter(i => i.name.toLowerCase().includes(name.toLocaleLowerCase()))
//       byName.length ? 
//       res.status(200).send(byName) :
//       res.status(404).send("No hay personaje con ese nombre");
//   } else {
//       res.status(200).send(allPokemon)
//   };
// });



// router.get("/pokemons/:idPokemon", async (req, res) => {
//   const id = parseInt(req.params.idPokemon);

//   if (!Number.isInteger(parseInt(id))) {
//     return res.status(400).json("El ID proporcionado no es un número entero válido");
//   }

//   try {
//     const pokemonDb = await Pokemon.findOne({
//       where: {
//         id: id,    
//       },
//       include: {
//         model: Type,
//         through:{
//           attributes: [],
//         },
//         attributes: ["name"],
//       },
//     });

//     if (pokemonDb) {
//       return res.json(pokemonDb);
//     } else {
//       const pokeApi = await getPokemonsAPI();
//       const foundPokemon = pokeApi.find((el) => el.id === id);

//       if (foundPokemon) {
//         return res.json(foundPokemon);
//       } else {
//         return res.status(404).json("El id no existe");
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send("Error interno del servidor");
//   }
// });

router.get("/types", async (req, res) => {
  const {data} = await axios.get('https://pokeapi.co/api/v2/type');
  const typess = data.map(el => el.types)
  const dbType = typess.flat()
  dbType.forEach(async el => {
    await Type.findOrCreate({
      where: {
        name: el
      }
    });
  });
  const allTypes = await Type.findAll({
    attributes: ['name']
  });
  const typeNames = allTypes.map(types => types.name);
  return res.status(200).send(typeNames);
});


const getAllTypes = async() => {
  let types = []
    const typesHere = await axios.get('https://pokeapi.co/api/v2/type');
    // devuelve un arreglo con el objeto adentro. hay que acceder a results - y luego a cada nombre.
     //devuelve un arreglo con nombres así pelados. No sé si los necesitamos así pero bueno (?)
    await Promise.all(typesHere.data.results.map(async (typ) => { 
      const newType = {
        name: typ.name, //mapeo y saco el nombre que es lo único que me sirve
      };
      const [typeNew, created] = await Type.findOrCreate({
        where: { name: newType.name },
        defaults: newType //uso el findOrCreate para guardar en la DB
      });
      types.push(typeNew); //Pusheo la nueva instancia.
      console.log(types);
    }))
      return types;
    }

    router.get('/types', async (req, res, next) => {
      try {
        const allTypes = await getAllTypes();
        
        if (allTypes.length === 0) {
            res.status(404).send('No se encontraron tipos');
          } else {
          res.status(200).send(allTypes);
        }
      } catch (error) {
        next(error);
      }
    });

// router.get("/types", async (req, res) => {
//   const pokemons = await getPokemonsAPI();
//   const typesSet = new Set();
//   pokemons.forEach(pokemon => {
//     pokemon.types.forEach(type => {
//       typesSet.add(type);
//     });
//   });
//   const typesArray = Array.from(typesSet);
//   typesArray.forEach(async (el) => {
//     await Type.findOrCreate({
//       where: {
//         name: el,
//       },
//     });
//   });
//   const allTypes = await Type.findAll({
//     attributes: ["name"],
//   });
//   const typeNames = allTypes.map((type) => type.name);
//   return res.status(200).send(typeNames);
// });


// router.post("/pokemons", async (req, res) => {
//   const { name, image, life, attack, defense, speed, height, weight, types, } = req.body;
//   try {
//     const [newPoke, created] = await Pokemon.findOrCreate({
//       where: { name, image, life, attack, defense, speed, height, weight }
//     });
//     if (!created) {
//       return res.status(409).send('Este Pokemon ya existe');
//     }
//     const tipos = await Type.findAll({
//       where:{
//         name: types
//       }
//     })
//     await newPoke.addTypes(tipos)
//     res.status(201).send("Pokemon Creado")
//   } catch(error) {
//     console.error(error);
//     res.status(500).send("Error en el servidor")
//   }
// })

// router.post('/pokemons', async(req, res) => {
//   const { name, image, life, attack, defense, speed, height, weight, types } = req.body;

//   try{
//     const newPoke = await Pokemon.create({
//       name,
//       image,
//       life,
//       attack,
//       defense,
//       speed,
//       height,
//       weight
//     });

//     const tipos = await Type.findAll({
//       where: {
//         name: types
//       }
//     })

//     await newPoke.addTypes(tipos)

//     res.status(201).json(newPoke);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error en el servidor" });
//   }
// });

router.post('/pokemons', async(req, res) => {
  const { name, image, life, attack, defense, speed, height, weight, types } = req.body;

  try {
    const allPo = await Pokemon.findAll();
    const filteredPoke = allPo.find((el) => el.name === name)
    
    if (filteredPoke) {
      return res.status(409).send('Esta Pokemon ya existe');
    }
 else{
    const newPoke = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight
    });
    console.log("Nuevo pokemon creado:", newPoke.toJSON());
    const tipos = await Type.findAll({
      where: {
        name: types
      }
    })

    await newPoke.addTypes(tipos)
    console.log("Tipos asociados al nuevo pokemon:", tipos.map(t => t.name));
    res.status(201).send("Pokemon Creado")
    return newPoke
  }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});





module.exports = router;
