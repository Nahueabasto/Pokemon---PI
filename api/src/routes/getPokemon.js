const { Router } = require("express");
const router = Router();

const axios = require('axios')
const { Pokemon, Type, Pokemon_Type, } = require('../db')


router.get('/pokemons', async (req, res, next) => {
    const {name} = req.query;
    try {
    const allPokemon = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['id', 'name']
      }
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
  


module.exports = router;
