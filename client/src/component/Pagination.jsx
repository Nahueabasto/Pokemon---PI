import React, { useState } from "react";
import "./Pagination.css";

export default function Pagination({ pokemonsPerPage, allPokemons, paginate, currentPage }) {
  const pageNumbers = [];
  const visiblePages = 20; // define cuántos números de página se muestran en el componente

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [firstPage, setFirstPage] = useState(0);
  const lastPage = firstPage + visiblePages >= pageNumbers.length ? pageNumbers.length : firstPage + visiblePages;
  const pagesToShow = pageNumbers.slice(firstPage, lastPage);

  const handleNextClick = () => {
    setFirstPage(firstPage + visiblePages);
  };

  const handlePreviousClick = () => {
    setFirstPage(firstPage - visiblePages);
  };

  return (
    <nav>
      <ul className="pagination">
        {/* Botón Previous */}
        {firstPage > 0 && (
          <span className="pagination-previous" onClick={handlePreviousClick}>
            Previous
          </span>
        )}

        {/* Renderiza cada número de página */}
        {pagesToShow.map((number) => (
          <span
            key={number}
            className={`pagination-number ${currentPage === number ? "active" : ""}`}
            onClick={() => paginate(number)}
          >
            {number}
          </span>
        ))}

        {/* Botón Next */}
        {firstPage + visiblePages < pageNumbers.length && (
          <span className="pagination-next" onClick={handleNextClick}>
            Next
          </span>
        )}
      </ul>
    </nav>
  );
}












