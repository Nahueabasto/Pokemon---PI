// const { Router } = require("express");
// const router = Router();
// const { getPokemon } = require("./controllers/info");


// router.get('/pokemons', async (req, res, next) => {
//     try {
//       const pokemonis = await getPokemon()
//       console.log(pokemonis)
      
//       if (pokemonis.length === 0) {
//           res.status(404).send('No se encontraron pokemones.');
//         } else {
//         console.log(pokemonis)
//         res.json(pokemonis);
//       }
//     } catch (error) {
//       next(error);
//     }
//   });