import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../Redux/Actions';
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    console.log(Array.isArray(allPokemons));

    useEffect(() => {
        //aca uso el useEffect para que cuando se renderice la pagina se ejecute la accion
        //esto es para que cuando cambie de pagina se actualice
      }, [allPokemons]);
    
    useEffect(() => {
        dispatch(getPokemons());
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
                return(
            <div key={el.id}>
                <Card 
                image={el.image}
                name={el.name}
                types={el.types?.join(", ")}
                id={el.id}
                />
            </div>
                )
            })}
       
        </div>

        </div>
    )
}