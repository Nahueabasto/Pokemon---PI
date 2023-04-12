const { Router } = require("express");
const router = Router();

const axios = require('axios')
const { Pokemon, Type, Pokemon_Type, } = require('../db')


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