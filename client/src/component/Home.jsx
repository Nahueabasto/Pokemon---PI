import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterByApiDb, orderBy, filterTypes } from '../Redux/Actions';
import { Link } from 'react-router-dom';
import Card from "./Card";
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import "./Home.css"
//import './styles.css';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    console.log(Array.isArray(allPokemons));
    const allTypes = useSelector((state) => state.types);

    // const [, setOrder] = useState("All");
    // const [, setPoke] = useState("All");

const [currentPage, setCurrentPage] = useState(1);
const [selectedApiDb, setSelectedApiDb] = useState("");
const [selectedSort, setSelectedSort] = useState("");
const [selectedTypes, setSelectedTypes] = useState("");

  const [pokemonsPerPage] = useState(12);
  const indexLastPoke = currentPage * pokemonsPerPage;
  const indexOfFirstPoke = indexLastPoke - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPoke, indexLastPoke);
  console.log(currentPokemons); // Agrega este console.log para verificar los datos de currentPokemons
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

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
        setSelectedApiDb("");
        setSelectedSort("");
        setSelectedTypes("")
    }

    function handlefilterByApiDb(e) {
        e.preventDefault();
        setSelectedApiDb(e.target.value);
        dispatch(filterByApiDb(e.target.value));
        setCurrentPage(1);
    }

    function handleSort(e){
        e.preventDefault();
        setSelectedSort(e.target.value);
        dispatch(orderBy(e.target.value));
        setCurrentPage(1);
    }

    function handlefilterTypes(e){
        e.preventDefault();
        setSelectedTypes(e.target.value);
        dispatch(filterTypes(e.target.value));
        setCurrentPage(1);
    }
    

    return (
      <div>
     <div class="container">
  <div class="form-container">
  <SearchBar class="search-bar" />
    <Link to="/home/form" class="create-pokemon" >Crear Pokemons</Link>
  </div>

  <div class="filter-container">
    <div class="filter-group">
      <div>
        <select value={selectedApiDb} onChange={(e) => handlefilterByApiDb(e)}>
          <option value="all">All</option>
          <option value="api">Api Pokemon</option>
          <option value="created">Pokemons creados</option>
        </select>
      </div>
      <div>
        <select value={selectedSort} onChange={(e) => handleSort(e)}>
          <option value="default">Orden</option>
          <optgroup label='Attack'>
            <option value="asc">asc</option>
            <option value="des">desc</option>
          </optgroup>
          <optgroup label='Alphabetic'>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </optgroup>
        </select>
      </div>
      <div>
        <select value={selectedTypes} onChange={(e) => handlefilterTypes(e)}>
          <option value="" disabled defaultValue> Pokemon por tipo </option>
          {allTypes.map(types => (
            <option key={types.id} value={types.name}>{types.name}</option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={(e) => handleClick(e)}>
          Limpiar filtros
        </button>
      </div>
    </div>
  </div>
</div>


    

            <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginate={paginate}
        currentPage={currentPage}
      />

 <div className="cards-wrapper">
        <div className="cards-container">
            {currentPokemons?.map((el) => {
                 const types =
                 el.types && el.types.map((type) => type.name).join(", "); // borrando esta linea, tambien renderiza, "ver el porque"
                return(

            <div className="card-container" key={el.uuid}>
                <Card 
                uuid={el.uuid}
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

//fijate si podes encontrar el filtrado mas todo lo demas que necesitamos hacer, en el medio de la card necesitamos poner el contenido sin modificar el tamaño de la card