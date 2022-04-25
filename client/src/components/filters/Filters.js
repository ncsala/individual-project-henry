import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	filterByDiet,
	getDiets,
	getRecipes,
	orderAlphabetically,
    orderByScore,
} from 'redux/actions/actions';

import styles from './Filters.module.css';

function Filters({ setPage, alphabeticalOrder, setAlphabeticalOrder, scoreOrder, setScoreOrder }) {
	const dispatch = useDispatch();

	const allDiets = useSelector((state) => state.allDiets);

    // Estado para limpiar los filtros
	const [filters, setFilters] = useState({
		diet: 'all',
		search: '',
	});

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	// el useRef lo utilice porque precisaba tener el value del select
	// para ordenar alfabéticamente
	const referenceSelectAlphabet = useRef();
    const referenceSelectScore = useRef();
	function handleFilteredByDiet(event) {
		const diet = event.target.value;
		event.preventDefault();
		setFilters({ ...filters, diet });
		dispatch(filterByDiet(diet));
		dispatch(orderAlphabetically(referenceSelectAlphabet.current.value));
        dispatch(orderByScore(referenceSelectScore.current.value));
		setPage(1);
	}

	// Para renderizar cuando se seleccione el ordenamiento alfabético
	// const [order, setOrder] = useState('ascending');
	const handleOrderAlphabetically = (event) => {
		const order = event.target.value;
		event.preventDefault();
		dispatch(orderAlphabetically(order));
        dispatch(orderByScore(referenceSelectScore.current.value));
		// La linea de abajo es la que hace renderizar el componente anterior
		setAlphabeticalOrder(order);
		setPage(1);
	}

    const handleByScore = (event) => {
        const order = event.target.value
        event.preventDefault()
        dispatch(orderByScore(order))
        //Ordeno alfabéticamente las recetas del state.filteredRecipes los ya ordenados por puntuación
        // a traves de la referencia al select
		dispatch(orderAlphabetically(referenceSelectAlphabet.current.value));
		// La linea de abajo es la que hace renderizar el componente anterior
        setScoreOrder(order)
        setPage(1)
    }

	const handleCleanFilters = (event) => {
		event.preventDefault();
		dispatch(getRecipes());
		setPage(1);
		setAlphabeticalOrder('disorderly');
        setScoreOrder('disorderly');
		setFilters({
			...filters,
			diet: 'all',
			search: '',
		});
	};

	return (
		<>
			<section className={styles.filters}>
				<button onClick={handleCleanFilters}>Limpiar Filtros</button>
                <select onChange={handleByScore} value={scoreOrder} ref={referenceSelectScore}>
                    <option value="disorderly" disabled>Ordenar por puntaje</option>
                    <option value="100a1">De Mayor a Menor</option>
                    <option value="1a100">De Menor a Mayor</option>
                </select>
				<select
					ref={referenceSelectAlphabet}
					onChange={handleOrderAlphabetically}
					value={alphabeticalOrder}
				>
					<option value='disorderly' disabled>
						Ordenar alfabéticamente
					</option>
					<option value='ascending'>Ascendente</option>
					<option value='descending'>Descendente</option>
				</select>
				<select onChange={handleFilteredByDiet} value={filters.diet}>
					<option value='all'>Todos</option>
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
