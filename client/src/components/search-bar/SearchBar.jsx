import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipesByName } from 'redux/actions/actions';

const SearchBar = ({setPage}) => {
	const [searchValue, setSearchValue] = useState('');
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
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={searchValue}
				onChange={handleChange}
				placeholder='Ingrese nombre de receta a buscar...'
			/>
			<button type='submit'>Buscar</button>
		</form>
	);
};

export default SearchBar;