import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { deletePokemon } from "../Redux/Actions";
import "./Card.css"

export default function Card({uuid, image, name, pokemonTypes, types}){

  //const dispatch = useDispatch();

  // const handleClick = (uuid) => {
  //   dispatch(deletePokemon(uuid))
  //   alert("Pokemon eliminado")
  // }



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
          </Link>
          <h2 className="cardName">{name}</h2>
          <h4 className="card-tipos">Types: {typeNames}</h4>
      </div>
    );
  }

  // <button className="btnDelete"  onClick={() => handleClick(uuid)} >Delete</button>