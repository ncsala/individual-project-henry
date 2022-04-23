import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByDiet,
	getDiets,
	getRecipes,
	orderAlphabetically,
} from 'redux/actions/actions';
import styles from './Filters.module.css';

function Filters({ setPage, order, setOrder }) {
	const dispatch = useDispatch();

	const allDiets = useSelector((state) => state.allDiets);

	const [filters, setFilters] = useState({
		alphabetically: 'disorderly',
		diet: 'all',
		search: '',
		// loading: true,
		// error: false,
	});

	useEffect(() => {
		dispatch(getDiets());
	}, [dispatch]);

	// el useRef lo utilice porque precisaba tener el value del select
	// para ordenar alfabéticamente
	const referencia = useRef();
	function handleFilteredByDiet(event) {
		const diet = event.target.value;
		const order = referencia.current.value;
		event.preventDefault();
		setFilters({ ...filters, diet });
		dispatch(filterByDiet(diet));
		dispatch(orderAlphabetically(order));
		setPage(1);
	}

	// Para renderizar cuando se seleccione el ordenamiento alfabético
	// const [order, setOrder] = useState('ascending');
	function handleOrderAlphabetically(event) {
		const order = event.target.value;
		event.preventDefault();
		// La linea de abajo es la que hace renderizar el componente anterior
		setOrder(order);
		dispatch(orderAlphabetically(order));
		setPage(1);
	}

	const handleCleanFilters = (event) => {
		event.preventDefault();
		dispatch(getRecipes());
		setPage(1);
		setOrder('disorderly');
		// setDiet('all');

		setFilters({
			...filters,
			alphabetically: 'disorderly',
			diet: 'all',
			search: '',
		});
	};

	return (
		<>
			<section className={styles.filters}>
				<button onClick={handleCleanFilters}>Limpiar Filtros</button>
				<select
					ref={referencia}
					onChange={handleOrderAlphabetically}
					value={order}
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
