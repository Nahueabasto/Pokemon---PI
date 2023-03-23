import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes } from '../Redux/Actions';
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    console.log(Array.isArray(allPokemons));
    const allTypes = useSelector((state) => state.types);

    useEffect(() => {
        //aca uso el useEffect para que cuando se renderice la pagina se ejecute la accion
        //esto es para que cuando cambie de pagina se actualice
      }, [allPokemons]);
    
    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return (
        <div>
            <div>
                <select name="" id="">
                    <option value="">Pokemon por tipo</option>
                    <option value="">Api Pokemon</option>
                    <option value="">Pokemons de la base de datos</option>
                </select>
            </div>
            <div>
                <select name="" id="">
                    <option value="">asc</option>
                    <option value="">desc</option>
                    <option value="">A-Z</option>
                    <option value="">Z-A</option>
                    <option value="">Attack</option>
                </select>
            </div>
        <div>
            {allPokemons?.map((el) => {
                 const types =
                 el.types && el.types.map((type) => type.name).join(", "); // borrando esta linea, tambien renderiza, "ver el porque"
                return(

            <div key={el.id}>
                <Card 
                image={el.image}
                name={el.name}
                pokemonTypes={el.pokemonTypes}
                types={el.types}
                />
                
            </div>
                )
            })}
       
        </div>

        </div>
    )
}