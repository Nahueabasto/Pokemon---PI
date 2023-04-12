const { Router } = require("express");
const router = Router();

const axios = require('axios')
const { Pokemon, Type, Pokemon_Type, } = require('../db')



router.get("/pokemons/:uuid", async (req, res) => {
    try {
    const { uuid } = req.params;
      const pokemonDb = await Pokemon.findOne({
        where: {
          uuid: uuid,    
        },
        include: {
          model: Type,
          through:{
            attributes: [],
          },
        },
          attributes: ["id", "name", "image", "life", "attack", "defense", "speed", "height", "weight", "pokemonTypes" ],
  
    });
    if (pokemonDb) {
      return res.json(pokemonDb);
    } else {
      throw new Error("Pokemon no encontrado");
    }
  } catch (e) {
    res.status(404).json("-");
  }
  });

  module.exports = router;