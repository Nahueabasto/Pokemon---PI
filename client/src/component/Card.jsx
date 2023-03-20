import React from "react";
import { Link } from "react-router-dom"

export default function Card({id, image, name, types}){

    return (
        <div>
            <Link to={`/pokemons/${id}`}>
            <div>
                <img src={image} alt="IMG" />
            </div>
            <h2>{name}</h2>
            <h4>Tipos: {types}</h4>
            </Link>
        </div>
    )
}