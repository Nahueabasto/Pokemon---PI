import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterByApiDb } from '../Redux/Actions';
import { Link } from 'react-router-dom';
import Card from "./Card";
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import "./Home.css"

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    console.log(Array.isArray(allPokemons));
    const allTypes = useSelector((state) => state.types);

    const [, setPoke] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexLastPoke = currentPage * pokemonsPerPage;
  const indexOfFirstPoke = indexLastPoke - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPoke, indexLastPoke);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

    useEffect(() => {
        //aca uso el useEffect para que cuando se renderice la pagina se ejecute la accion
        setCurrentPage(1);//esto es para que cuando cambie de pagina se actualice
      }, [allPokemons]);
    
    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    function handlefilterByApiDb(e) {
        e.preventDefault();
        dispatch(filterByApiDb(e.target.value));
        setCurrentPage(1);
        setPoke(e.target.value)
    }

    return (
        <div>
            <div>
                <Link to="/home/form">Crear Pokemons</Link>
            </div>
            <div>
                <SearchBar />
            </div>
            <div>
            <div>
                <select onChange={(e) => handlefilterByApiDb(e)}>
                    <option value="all">All</option>
                    <option value="api">Api Pokemon</option>
                    <option value="created">Pokemons creados</option>
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
                <select name="" id="">
                <option value="">Pokemon por tipo</option>
                </select>
            </div>
            </div>

            <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginate={paginate}
      />

 <div className="cards-wrapper">
        <div className="cards-container">
            {currentPokemons?.map((el) => {
                 const types =
                 el.types && el.types.map((type) => type.name).join(", "); // borrando esta linea, tambien renderiza, "ver el porque"
                return(

            <div className="card-container" key={el.uuid}>
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

        </div>
    )
}