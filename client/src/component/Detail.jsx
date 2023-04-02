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
    <div class="contenedor">
      <div class="card-imagen">
        <img src={details.image} alt="Not found" />
      </div>
      <div className="detalle">
        <p class="detalle-texto">Nombre: {details.name}</p>
        <p class="detalle-texto">Vida: {details.life}</p>
        <p class="detalle-texto">Ataque: {details.attack}</p>
        <p class="detalle-texto">Defensa: {details.defense}</p>
        {details.speed && <p class="detalle-texto">Velocidad: {details.speed}</p>}
        {details.height && <p class="detalle-texto">Altura: {details.height}</p>}
        {details.weight && <p class="detalle-texto">Peso: {details.weight}</p>}
        <p class="detalle-texto">Tipos: {details.types?.map(type => type.name).join(', ') || details.pokemonTypes?.split(',').join(', ')}</p>
      </div>
    </div>
  )}
</div>
)

}