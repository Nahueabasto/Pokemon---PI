import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Redux/Actions";
import "./Detail.css"

export default function PokeDetail({uuid}){
    const details = useSelector((state) => state.detail);
    const dispatch = useDispatch();

    useEffect( () => { //trae los countries de nuevo cada vez que renderiza o que hay un cambio.
        dispatch(getDetail(uuid));
    },[dispatch, uuid]);


   return(
    <div class="contenedor-principal">
  {details && (
    <>
      <p>Nombre: {details.name}</p>
      <img src={details.image} alt="Not found" />
      <p>Vida: {details.life}</p>
      <p>Ataque: {details.attack}</p>
      <p>Defensa: {details.defense}</p>
      {details.speed && <p>Velocidad: {details.speed}</p>}
      {details.height && <p>Altura: {details.height}</p>}
      {details.weight && <p>Peso: {details.weight}</p>}
      <p>Tipo: {details.types?.map(type => type.name).join(', ') || details.pokemonTypes?.split(',').join(', ')}</p>
    </>
  )}
</div>
)

}