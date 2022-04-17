import React from 'react';

import { getRecipes, filterByDiet, orderAlphabetically } from 'redux/actions/actions';

// Importación de Hooks
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Filters() {
    const dispatch = useDispatch();
    
    // Se trae en la constante todo lo que esta en el estado de recipes
    // El useSelector se usa para traer datos del estado
    // allRecipes = [{receta1}, {receta2}, {receta3}]
    const allRecipes = useSelector((state) => state.filteredRecipes);
    
    // Para renderizar cuando se seleccione el ordenamiento alfabetico
    const [order, setOrder] = useState('ascending');
    
    const referencia = useRef();
    
    function handleFilteredByDiet(event) {
        const diet = event.target.value;
        const order = referencia.current.value
        event.preventDefault();
        dispatch(filterByDiet(diet))
        dispatch(orderAlphabetically(order))
        setCurrentPage(1);
    }
    
    function handleOrderAlphabetically(event) {
        const order = event.target.value;
        // event.preventDefault();
        dispatch(orderAlphabetically(order))
        setCurrentPage(1);
        setOrder(`Ordenado ${order}`)
    }
    
    // Recargamos las recipes cuando con el botón
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getRecipes());
    };


	return (
		<section className='filters'>
			<button onClick={handleClick}>Recargar Recetas</button>
			<select
				ref={referencia}
				onChange={handleOrderAlphabetically}
				name=''
				id=''
			>
				{/* <option value='disorderly' disabled>Ordenar alfabéticamente</option> */}
				<option value='ascending'>Ascendente</option>
				<option value='descending'>Descendente</option>
			</select>
			<select onChange={handleFilteredByDiet} name='' id=''>
				<option value='all'>Todos</option>
				<option value='gluten free'>gluten free</option>
				<option value='ketogenic'>ketogenic</option>
				<option value='vegetarian'>vegetarian</option>
				{/* <option value='ovo-vegetarian'>ovo-vegetarian</option> */}
				{/* <option value='lacto-vegetarian'>lacto-vegetarian</option> */}
				<option value='vegan'>vegan</option>
				<option value='pescetarian'>pescetarian</option>
				<option value='paleo'>paleo</option>
				<option value='primal'>primal</option>
				<option value='low fodmap'>low fodmap</option>
				<option value='whole30'>whole30</option>
				<option value='dairy free'>dairy free</option>
				<option value='lacto ovo vegetarian'>
					lacto ovo vegetarian
				</option>
				<option value='paleolithic'>paleolithic</option>
				<option value='primal'>primal</option>
			</select>
		</section>
	);
}

export default Filters;
