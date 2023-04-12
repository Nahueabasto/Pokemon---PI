const { Router } = require("express");
const router = Router();

const axios = require('axios')
const { Pokemon, Type, Pokemon_Type, } = require('../db')



async function getAllTypes() {
    const types = await Type.findAll();
    const typeData = types.map(type => ({ id: type.id, name: type.name }));
    return typeData;
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
  
  module.exports = router;