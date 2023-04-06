import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getPokemons, getTypes } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";


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
        alert("Personaje creado!")//Para que lo vea el usuario!.-
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
        history.push('/home'); //Redirigue a la ruta que le digo, cuando termine de hacer el post.-
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
            <div >
            <form className="form-containerr" onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label for='name' className="label">Name:</label>
                    <input className="form__input" type="text" value={input.name} name='name' id='name'
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.name && <span class="form-error">{errors.name}</span>}
                    </div>
                </div>
                <div>
                    <label for='image' className="label">Image:</label>
                    <input className="form__input" type="url" value={input.image} name='image' id='image'
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.image && <span class="form-error">{errors.image}</span>}
                    </div>
                </div>
                <div>
                    <label for='life' className="label">Life:</label>
                    <input className="form__input" type="number" value={input.life} name='life' id='life'
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.life && <span class="form-error">{errors.life}</span>}
                    </div>
                </div>
                <div>
                    <label for='attack' className="label">Attack:</label>
                    <input className="form__input" type="number" value={input.attack} name='attack' id='attack'
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.attack && <span class="form-error">{errors.attack}</span>}
                    </div>
                </div>
                <div>
                    <label for='defense' className="label">Defense:</label>
                    <input className="form__input" type="number" value={input.defense} name='defense' id='defense'
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.defense && <span class="form-error">{errors.defense}</span>}
                    </div>
                </div>
                <div>
                    <label for='speed' className="label">Speed:</label>
                    <input className="form__input" type="number" value={input.speed} name='speed' id='speed' 
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.speed && <span class="form-error">{errors.speed}</span>}
                    </div>
                </div>
                <div>
                    <label for='height' className="label">Height:</label>
                    <input className="form__input" type="number" value={input.height} name='height' id='height' 
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.height && <span class="form-error">{errors.height}</span>}
                    </div>
                </div>
                <div>
                    <label form='weight' className="label">Weight:</label>
                    <input className="form__input" type="number" value={input.weight} name='weight' id='weight' 
                    onChange={e => handleChange(e)}>
                    </input>
                    <div className="error-container">
                    {errors.weight && <span class="form-error">{errors.weight}</span>}
                    </div>
                </div>
                <div>
                    <label form='types' className="form__input">Types:</label>
                    <select className='select' name='types' id='types' onChange={e => handleSelect(e)}>
                    <option value="" > Types </option>
                        {tipes.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                        }
                    </select>
                    <div className="error-container">
                    {errors.types && <span className="form-error">{errors.types}</span>}
                    </div>
                </div>

                <div>
                <button className='crear' type='submit'>Crear Pokemon</button>
                </div>

                <div> {input.types?.map(el => (
                  <span key={el.id}>
                   <div className='tp'> {el}</div>
                   <button onClick={(e) => handleDelete(e, el)}>x</button>
                  </span>
                ))}
                    </div>
               
            </form>
            </div>
        </div>
      )
}