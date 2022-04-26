import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from 'components/search-bar/SearchBar';

import {
	filterByDiet,
	getDiets,
	getRecipes,
    orderByScoreOrAlphabet,
} from 'redux/actions/actions';

import styles from './Filters.module.css';

function Filters({
	setPage,
	order,
	setOrder,
	setCurrentPage,
}) {
	const dispatch = useDispatch();

	const allDiets = useSelector((state) => state.allDiets);

	// Estados para limpiar los filtros
	const [dietFilter, setDietFilter] = useState('all');
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	function handleFilteredByDiet(event) {
		const diet = event.target.value;
		event.preventDefault();
		setOrder('disorderly');
        setSearchValue('')  
		dispatch(filterByDiet(diet));
		setDietFilter(diet);
		setPage(1);
	}

    // Para renderizar cuando se seleccione ordenamiento
    // const [order, setOrder] = useState('ascending');
	const handleOrder = (event) => {
		const ordering = event.target.value;
		event.preventDefault();
		dispatch(orderByScoreOrAlphabet(ordering));
		setOrder(ordering);
		setPage(1);
	};

	const handleCleanFilters = (event) => {
		event.preventDefault();
		dispatch(getRecipes());
		setOrder('disorderly');
		setDietFilter('all');
		setSearchValue('');
		setPage(1);
	};

	return (
		<>
			<section className={styles.filters}>
				<button onClick={handleCleanFilters}>Recargar Todas las Recetas</button>
				{/* Componente Buscar */}
				<SearchBar
					setPage={setCurrentPage}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>
				<select
					onChange={handleOrder}
					value={order}
				>
					<option value='disorderly' disabled>
						Ordenar por
					</option>
					<option value='100a1'>Mayor Puntuación</option>
					<option value='1a100'>Mayor Puntuación</option>
					<option value='ascending'>De la A a la Z</option>
					<option value='descending'>De la Z a la A</option>
				</select>
				<select onChange={handleFilteredByDiet} value={dietFilter}>
					<option value='all'>Todas las Dietas</option>
					{allDiets.length > 0 &&
						allDiets.map((diet) => (
							<option
								key={diet.id}
								value={diet.type_of_diet_name}
							>
								{diet.type_of_diet_name}
							</option>
						))}
				</select>
			</section>
		</>
	);
}

export default Filters;
