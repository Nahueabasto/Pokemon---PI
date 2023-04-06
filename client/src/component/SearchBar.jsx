import React, { useState }from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../Redux/Actions";
import "./SearchBar.css"

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault(e);
        dispatch(getNamePokemon(name))
    }

    return(
        <div>
            <input id="search-input" type="text" placeholder="Search pokemon" 
            onChange={e => handleInputChange(e)} />
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )

}