import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getPokemons, getTypes } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";


function validate(input){
    let errors = {};

    if(!input.name.trim()){
        errors.name = 'El nombre es obligatorio';
    }else if(/[^a-zA-Z -]/.test(input.name)){
        errors.name = 'El nombre solo puede contener letras, espacios y guiones';
    }

    if(!input.image.trim()){
        errors.image = 'La imagen es obligatoria';
    }else if(!/^(http|https):\/\/[^ "]+$/.test(input.image)){
        errors.image = 'La imagen debe ser una URL válida';
    }

    if(!input.life){
        errors.life = 'La vida es obligatoria';
    }else if(input.life < 1 || input.life > 200){
        errors.life = 'La vida debe ser un número entre 1 y 200';
    }

    if(!input.attack){
        errors.attack = 'El ataque es obligatorio';
    }else if(input.attack < 1 || input.attack > 200){
        errors.attack = 'El ataque debe ser un número entre 1 y 200';
    }

    if(!input.defense){
        errors.defense = 'La defensa es obligatoria';
    }else if(input.defense < 1 || input.defense > 200){
        errors.defense = 'La defensa debe ser un número entre 1 y 200';
    }

    if(input.speed && (input.speed < 0 || isNaN(input.speed))){
        errors.speed = 'La velocidad debe ser un número positivo';
    }

    if(input.height && (input.height < 0 || isNaN(input.height))){
        errors.height = 'La altura debe ser un número positivo';
    }

    if(input.weight && (input.weight < 0 || isNaN(input.weight))){
        errors.weight = 'El peso debe ser un número positivo';
    }

    if (input.types.length === 0) {
      errors.types = "Debe seleccionar al menos un tipo";
    }

    return errors;
}



export default function Form(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allPokemons = useSelector((state) => state.pokemons)
    const tipes = useSelector((state) => state.types)

    const [errors, setErrors] = useState({ });

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

      function handleChange(e){
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors(
            validate({
            ...input,
            [e.target.name] : e.target.value
        })
        )
    }

    function handleSelect(e) {
        setInput({ ...input, types: [ ...input.types, e.target.value ] });
        setErrors(
            validate({
                ...input,
                [e.target.name] : e.target.value
            })
        )
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
        history.push('/home');
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
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label className="image">Image:</label>
                    <input type="url" value={input.image} name='image' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.image && <p>{errors.image}</p>}
                </div>
                <div>
                    <label className="life">Life:</label>
                    <input type="number" value={input.life} name='life' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.life && <p>{errors.life}</p>}
                </div>
                <div>
                    <label className="attack">Attack:</label>
                    <input type="number" value={input.attack} name='attack' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.attack && <p>{errors.attack}</p>}
                </div>
                <div>
                    <label className="defense">Defense:</label>
                    <input type="number" value={input.defense} name='defense' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.defense && <p>{errors.defense}</p>}
                </div>
                <div>
                    <label className="speed">Speed:</label>
                    <input type="number" value={input.speed} name='speed' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.speed && <p>{errors.speed}</p>}
                </div>
                <div>
                    <label className="height">Height:</label>
                    <input type="number" value={input.height} name='height' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.height && <p>{errors.height}</p>}
                </div>
                <div>
                    <label className="weight">Weight:</label>
                    <input type="number" value={input.weight} name='weight' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.weight && <p>{errors.weight}</p>}
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
                    {errors.types && <span className="error">{errors.types}</span>}
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

