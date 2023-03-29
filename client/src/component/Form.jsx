import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getPokemons, getTypes } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

// function validate(input){
//     let errors = {};


// }


export default function Form(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allPokemons = useSelector((state) => state.pokemons)
    const tipes = useSelector((state) => state.types)

    const [input, setInput] = useState({
        name: '', 
        image: '',
        life: '', 
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '', 
        types: []
    });

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes())
      }, [dispatch]);

      function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    };

    function handleSelect(e) {
        setInput({
            ...input,
            types: [
                ...input.types,
                e.target.value
            ]
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input))
        alert("Personaje creado!")
        setInput({
            name: '', 
        image: '',
        life: '', 
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '', 
        types: []
        });
       // history.push('')
    };

    function handleDelete(e, el) {
        e.preventDefault();
        setInput({
          ...input,
          types: input.types.filter(item => item !== el)
        });
      };

      return(
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1>Crear Pokemons</h1>
            <form onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label className="name">Name:</label>
                    <input type="text" value={input.name} name='name' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="image">Image:</label>
                    <input type="url" value={input.image} name='image' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="life">Life:</label>
                    <input type="number" value={input.life} name='life' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="attack">Attack:</label>
                    <input type="number" value={input.attack} name='attack' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="defense">Defense:</label>
                    <input type="number" value={input.defense} name='defense' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="speed">Speed:</label>
                    <input type="number" value={input.speed} name='speed' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="height">Height:</label>
                    <input type="number" value={input.height} name='height' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="weight">Weight:</label>
                    <input type="number" value={input.weight} name='weight' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label className="types">Types:</label>
                    <select name='types' onChange={e => handleSelect(e)}>
                    <option value="" > Types </option>
                        {tipes.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                        }
                    </select>
                </div>
                <div> {input.types?.map(el => (
                  <span key={el.id}>
                   <p> {el}</p>
                   <button onClick={(e) => handleDelete(e, el)}>x</button>
                  </span>
                ))}
                    </div>
                    <div>
                <button type='submit'>Crear Pokemon</button>
                </div>
                
            </form>
        </div>
      )
}

