import React from "react";
import { Link } from "react-router-dom"

export default function Card({id, image, name, pokemonTypes, types}){
    // const allTypes = types?.map((type) => type.name) || pokemonTypes?.split(",");

    // const typeNames = allTypes.join(", ");
    const allTypes = [];

    if (pokemonTypes && pokemonTypes.length > 0) {
        allTypes.push(...pokemonTypes.split(","));
    }

    if (types && types.length > 0) {
        types.forEach((type) => {
            if (!allTypes.includes(type.name)) {
                allTypes.push(type.name);
            }
        });
    }

    const typeNames = allTypes && allTypes.join(", ");
  
    return (
      <div>
        <Link to={`/pokemons/${id}`}>
          <div>
            <img src={image} alt="IMG" />
          </div>
          <h2>{name}</h2>
          <h4>Tipos: {typeNames}</h4>
        </Link>
      </div>
    );
  }