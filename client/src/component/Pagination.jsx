import React from "react";
import "./Pagination.css"


export default function Pagination({ pokemonsPerPage, allPokemons, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagesPerRow = 30;
  const pageRows = [];
  for (let i = 0; i < pageNumbers.length; i += pagesPerRow) {
    pageRows.push(pageNumbers.slice(i, i + pagesPerRow));
  }

  return (
    <nav>
      {/* Renderiza cada fila en su propia lista no ordenada */}
      {pageRows.map((row, index) => (
        <ul key={index} className="pagination">
          {row.map((number) => (
            <span key={number} className="pagination-number" onClick={() => paginate(number)}>
              {number}
            </span>
          ))}
        </ul>
      ))}
    </nav>
  );
}
