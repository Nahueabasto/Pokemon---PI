import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"

export default function Card({uuid, image, name, pokemonTypes, types}){
    // const allTypes = types?.map((type) => type.name) || pokemonTypes?.split(",");

    // const typeNames = allTypes.join(", ");

    //para poder renderizar los types segun vengan de la los pokemon guardados de la api, o de los creados
   

    console.log("uuid in Card:", uuid);
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
        <Link to={`/pokemons/${uuid}`} className="card-link">
          <div>
            <img src={image} alt="IMG" />
          </div>
          <h2 className="cardName">{name}</h2>
          <h4 className="card-tipos">Tipos: {typeNames}</h4>
        </Link>
      </div>
    );
  }