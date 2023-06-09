const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const createPokemon = require("./createPokemon");
const getPokemon = require("./getPokemon");
const getTypes = require("./getTypes");
const pokemonUuid = require("./pokemonUuid");
// const deleteDog = require("./deleteDog");

router.use("/", createPokemon);
router.use("/", getPokemon);
router.use("/", pokemonUuid);
router.use("/", getTypes);
//router.use("/", deleteDog);

module.exports = router;



/// SIN MODULARIZAR: ///////

//const router = Router();
//const getPokemon = require("./getPokemon");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//// para guardarme las cosas en la db ///////

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

// router.get('/pokemons', async (req, res, next) => {
//   const {name} = req.query;
//   try {
//   const allPokemon = await Pokemon.findAll({
//     include: {
//       model: Type,
//       attributes: ['id', 'name']
//     }
//   });
//   const result = name
//       ? allPokemon.filter((el) =>
//           el.name.toString().toLowerCase().includes(name.toLowerCase())
//         )
//       : allPokemon;

//     if (result.length === 0) {
//       res.status(404).send('No se encontraron Pokemon con ese nombre.');
//     } else {
//       res.json(result);
//     }
//   } catch (error) {
//     next(error);
//   }
// });


// router.get("/pokemons/:uuid", async (req, res) => {
//   try {
//   const { uuid } = req.params;
//     const pokemonDb = await Pokemon.findOne({
//       where: {
//         uuid: uuid,    
//       },
//       include: {
//         model: Type,
//         through:{
//           attributes: [],
//         },
//       },
//         attributes: ["id", "name", "image", "life", "attack", "defense", "speed", "height", "weight", "pokemonTypes" ],

//   });
//   if (pokemonDb) {
//     return res.json(pokemonDb);
//   } else {
//     throw new Error("Pokemon no encontrado");
//   }
// } catch (e) {
//   res.status(404).json("-");
// }
// });


// ////////funcion para traerme la info de la api ////////////////////////

// // const getAllTypes = async() => {
// //   let types = []
// //     const typesHere = await axios.get('https://pokeapi.co/api/v2/type');
// //     // devuelve un arreglo con el objeto adentro. hay que acceder a results - y luego a cada nombre.
// //      //devuelve un arreglo con nombres así pelados. No sé si los necesitamos así pero bueno (?)
// //     await Promise.all(typesHere.data.results.map(async (typ) => { 
// //       const newType = {
// //         name: typ.name, //mapeo y saco el nombre que es lo único que me sirve
// //       };
// //       const [typeNew, created] = await Type.findOrCreate({
// //         where: { name: newType.name },
// //         defaults: newType //uso el findOrCreate para guardar en la DB
// //       });
// //       types.push(typeNew); //Pusheo la nueva instancia.
// //       console.log(types);
// //     }))
// //       return types;
// //     }


// //     router.get('/types', async (req, res, next) => {
// //       try {
// //         const allTypes = await getAllTypes();
        
// //         if (allTypes.length === 0) {
// //             res.status(404).send('No se encontraron tipos');
// //           } else {
// //           res.status(200).send(allTypes);
// //         }
// //       } catch (error) {
// //         next(error);
// //       }
// //     });


// ///////////////////// para traerme los types de la db ////////////

// async function getAllTypes() {
//   const types = await Type.findAll();
//   const typeData = types.map(type => ({ id: type.id, name: type.name }));
//   return typeData;
// }

// router.get('/types', async (req, res, next) => {
//   try {
//     const allTypes = await getAllTypes();
    
//     if (allTypes.length === 0) {
//       res.status(404).send('No se encontraron tipos');
//     } else {
//       res.status(200).send(allTypes);
//     }
//   } catch (error) {
//     next(error);
//   }
// });



// router.post('/pokemons', async(req, res) => {
//   const { name, image, life, attack, defense, speed, height, weight, types } = req.body;

//   try {
//     const allPo = await Pokemon.findAll();
//     const filteredPoke = allPo.find((el) => el.name === name)
    
//     if (filteredPoke) {
//       return res.status(409).send('Esta Pokemon ya existe');
//     }
//  else{
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
//     console.log("Nuevo pokemon creado:", newPoke.toJSON());
//     const tipos = await Type.findAll({
//       where: {
//         name: types
//       }
//     })

//     await newPoke.addTypes(tipos)
//     console.log("Tipos asociados al nuevo pokemon:", tipos.map(t => t.name));
//     res.status(201).send("Pokemon Creado")
//     return newPoke
//   }
    
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error en el servidor" });
//   }
// });


// router.delete("/pokemons/:uuid", async (req, res) => {
//   const { uuid } = req.params;
//   try {
//     await Pokemon.destroy({
//       where: {uuid: uuid,} //destruye el pokemon con la id indicada.
//     });
//   return res.status(200).json("Pokemon eliminado")
//   }catch(error){
//       return res.status(400).json(error)
//   }
// });



// module.exports = router;
