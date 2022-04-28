import React from 'react';

const Paginated = ({ allRecipes, setCurrentPage, RECIPES_PER_PAGE }) => {
    const pageNumbers = [];

    // Se hace un for para que se generen los números de paginas
    // pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, etc]
    for (let i = 1; i <= Math.ceil(allRecipes / RECIPES_PER_PAGE); i++) {
        pageNumbers.push(i);
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {pageNumbers &&
                pageNumbers.map((number) => {
                    return (
                        <button
                            onClick={() => paginated(number)}
                            key={number}
                        >
                            {number}
                        </button>
                    );
                })}
        </>
    );
};

export default Paginated;
