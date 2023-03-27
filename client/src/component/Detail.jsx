import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
import { getDetail } from "../Redux/Actions";

export default function Detail(props){

const dispatch = useDispatch();

    const details = useSelector((state) => state.detail);
    //const { uuid } = useParams();
    const {uuid} = props.match.params;
    console.log(uuid);
    console.log(`Componente Detail con uuid: ${uuid}`);

    useEffect(() => {
        dispatch(getDetail(uuid));
       // dispatch(getPokemons())
    }, [dispatch, uuid]);

    console.log("Renderizando componente Detail");

    return(
        <div>
      {details && (
        <>
          <h1> name {details.name}</h1>
      
        </>
      )}
    </div>
    )

}


// return(
//     <div>
//   {details && (
//     <>
//       <h1>{details.name}</h1>
//       <img src={details.image} alt="Not found" />
//       <p>ID: {details.uuid}</p>
//       <p>Nombre: {details.name}</p>
//       <p>Vida: {details.life}</p>
//       <p>Ataque: {details.attack}</p>
//       <p>Defensa: {details.defense}</p>
//       {details.speed && <p>Velocidad: {details.speed}</p>}
//       {details.height && <p>Altura: {details.height}</p>}
//       {details.weight && <p>Peso: {details.weight}</p>}
//       <p>Tipo: {details.types}</p>
//     </>
//   )}
// </div>
// )

// }