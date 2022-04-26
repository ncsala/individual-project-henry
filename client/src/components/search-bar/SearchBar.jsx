import React from 'react';
import { useDispatch } from 'react-redux';

import { searchRecipesByName } from 'redux/actions/actions';

const SearchBar = ({setPage, searchValue, setSearchValue}) => {
	const dispatch = useDispatch();

	const handleChange = (event) => {
		const inputValue = event.target.value;
		event.preventDefault();
		setSearchValue(inputValue);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(searchRecipesByName(searchValue));
        setPage(1);
	};

	return (
		<div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={searchValue}
                    onChange={handleChange}
                    placeholder='Busque su receta...'
                    pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\-., ]{3,100}"
                    title="Debe contener al menos 3 caracteres, solo letras, puntos, comas y guiones"
                />
                <button type='submit'>Buscar</button>
            </form>
        </div>
	);
};

export default SearchBar;