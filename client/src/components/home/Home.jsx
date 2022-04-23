import React from 'react';

import { Link } from 'react-router-dom';
import { getRecipes, filterByDiet, orderAlphabetically } from 'redux/actions/actions';

// Importación de Hooks
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Componentes
import Paginated from 'components/paginated/Paginated';
import SearchBar from 'components/search-bar/SearchBar';

import styles from './Home.module.css'
import Cards from 'components/cards/Cards';


const RECIPES_PER_PAGE = 9;

// Input de búsqueda para encontrar recetas por nombre
// Área donde se verá el listado de recetas. Deberá mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
// Botones/Opciones para filtrar por por tipo de dieta
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
// Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.
const Home = () => {
    const dispatch = useDispatch();
    // Se trae en la constante todo lo que esta en el estado de recipes
    // El useSelector se usa para traer datos del estado
    // allRecipes = [{receta1}, {receta2}, {receta3}]
    const allRecipes = useSelector((state) => state.filteredRecipes);
    // Se traen los errores del estado global
    const error = useSelector((state) => state.msgError
    );

    const [state, setState]= useState({
        alphabetically: 'disorderly',
        diet: '',
        search: '',
        // page: 1,
        // recipes: [],
        // recipesPerPage: RECIPES_PER_PAGE,
        // totalPages: 0,
        // totalRecipes: 0,
        // loading: true,
        // error: false,
    });

    // PAGINACIÓN ----------------------------------------------------------------------------------------------------
    // Se crea la paginación de 9 recetas por pagina
    // Para renderizar cuando modifique el estado
    const [currentPage, setCurrentPage] = useState(1);
    const lastRecipeInPage = currentPage * RECIPES_PER_PAGE;
    const firstRecipeInPage = lastRecipeInPage - RECIPES_PER_PAGE;
    // Se crea un array con las recetas que se mostrarán en la página actual
    // Se corta el array de todas las recetas con los dos indices inicial y final de la página
    let currentRecipes = allRecipes ? allRecipes.slice(firstRecipeInPage, lastRecipeInPage) : [];
    // Función para cambiar estado de acuerdo a la página seleccionada
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //---------------------------------------------------------------------------------------------------------------

    // useEffect sirve para que el renderizado se realice una sola vez cuando se monta el componente
    // el segundo parámetro es un array vacío, porque no se quiere que se ejecute nuevamente el useEffect
    // cuando se cambie el estado de recipes
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);


    const referencia = useRef();
    function handleFilteredByDiet(event) {
        const diet = event.target.value;
        const order = referencia.current.value
        event.preventDefault();
        dispatch(filterByDiet(diet))
        dispatch(orderAlphabetically(order))
        setCurrentPage(1);
    }

    // Para renderizar cuando se seleccione el ordenamiento alfabético
    const [order, setOrder] = useState('ascending');
    function handleOrderAlphabetically(event) {
        const order = event.target.value;
        event.preventDefault();
        dispatch(orderAlphabetically(order))
        setCurrentPage(1);
        setOrder(order)
        setState({
            ...state,
            alphabetically: order
        })
    }

    // Recargamos las recipes cuando con el botón
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getRecipes());
    };

    return (
        <main className={styles.main_home}>

            <div className={styles.bkg}>
                <div className={styles.title_container}>
                    <h1 className={styles.title}>Busque su receta</h1>
                </div>
                {/* Componente Buscar */}
                <div className={styles.search_container}>
                    <SearchBar setPage={setCurrentPage} />
                </div>
                <section className={styles.filters}>
                    <button onClick={handleClick}>Recargar Recetas</button>
                    <select ref={referencia} onChange={handleOrderAlphabetically} value={state.alphabetically} name='' id=''>
                        <option value='disorderly' disabled>Ordenar alfabéticamente</option>
                        <option value='ascending'>Ascendente</option>
                        <option value='descending'>Descendente</option>
                    </select>
                    <select onChange={handleFilteredByDiet} name='' id=''>
                        <option value='all'>Todos</option>
                        <option value='gluten free'>gluten free</option>
                        {/* <option value='ketogenic'>ketogenic</option> */}
                        {/* <option value='vegetarian'>vegetarian</option> */}
                        {/* <option value='ovo-vegetarian'>ovo-vegetarian</option> */}
                        {/* <option value='lacto-vegetarian'>lacto-vegetarian</option> */}
                        <option value='vegan'>vegan</option>
                        {/* <option value='pescetarian'>pescetarian</option> */}
                        {/* <option value='paleo'>paleo</option> */}
                        <option value='primal'>primal</option>
                        {/* <option value='low fodmap'>low fodmap</option> */}
                        {/* <option value='whole30'>whole30</option> */}
                        <option value='dairy free'>dairy free</option>
                        <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
                        <option value='paleolithic'>paleolithic</option>
                    </select>
                </section>

                {/* <p>{error}</p> */}

                <nav className={styles.paginated}>
                    <Paginated
                        allRecipes={allRecipes.length}
                        paginated={paginated}
                        RECIPES_PER_PAGE={RECIPES_PER_PAGE}
                    />
                </nav>

                {/* Renderiza las recetas */}
                <section className={styles.recipes_container}>
                    {(error.length && <p>{error}</p>) ||
                        (!currentRecipes.length
                            ? (<h2 className={styles.load}> </h2>)
                            : <Cards currentRecipes={currentRecipes} />)
                    }
                </section>

            </div>

        </main>
    );
};

export default Home;

// diets={(recipe.type_of_diets) ? recipe.type_of_diets.map((d) => {
//     return d.type_of_diet_name
// }) : recipe.diets}

// {/* Cuando no carga por alguna razón las recetas, muestro mensaje.
// ¡ARREGLAR¡, muestra el mensaje aunque todavía aun cuando esta esperando la respuesta */}
// {!allRecipes.length ? (
//     <h4>
//         ¡Opss!, no hay recetas para mostrar esta vez, quizás la
//         próxima vez tengamos ganas de cocinar algo
//     </h4>
// ) : null}

// Se crea el hook para que se ejecute una sola vez
// useEffect(() => {
//     setPagination({
//         currentPage: 1,
//         recipesPerPage: 9
//     })
// }, [allRecipes])

// // Se crea el estado para el filtro de recetas
// const [filter, setFilter] = useState({
//     type: '',
//     name: ''
// })

// // Se crea el estado para el ordenamiento de recetas
// const [order, setOrder] = useState({
//     orderBy: '',
//     orderType: ''
// })
