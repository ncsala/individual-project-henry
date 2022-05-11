import React from 'react';

import styles from './Paginated.module.css';

const Paginated = ({ allRecipes, currentPage, setCurrentPage, RECIPES_PER_PAGE }) => {
    const pageNumbers = [];

    const numbersOfPages = Math.ceil(allRecipes / RECIPES_PER_PAGE);

    // Se hace un for para que se generen los números de paginas
    // pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, etc]
    for (let i = 1; i <= numbersOfPages; i++) {
        pageNumbers.push(i);
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <>
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={currentPage === 1 ? styles.disabled : styles.previous_and_next_button}>
                Anterior
            </button>
            {pageNumbers &&
                pageNumbers.map((number) => {
                    return (
                        <button
                            onClick={() => paginated(number)}
                            key={number}
                            className={currentPage === number ? styles.disabled : styles.page_number}
                            disabled={currentPage === number}
                        >
                            {number}
                        </button>
                    );
                })}
            <button
                onClick={handleNextPage}
                disabled={currentPage === numbersOfPages}
                className={currentPage === numbersOfPages ? styles.disabled : styles.previous_and_next_button}>
                Siguiente
            </button>
        </>
    );
};

export default Paginated;
