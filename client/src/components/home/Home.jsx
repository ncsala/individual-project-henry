import React from 'react';

// Importacion de Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getRecipes } from 'redux/actions/actions';

// Componentes
import Card from 'components/card/Card';
import Paginated from 'components/paginated/Paginated';

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
    // El useSelector se usa para
    // allRecipes = [{receta1}, {receta2}, {receta3}]
    const allRecipes = useSelector((state) => state.recipes);

    // Se crea la paginación de 9 recetas por pagina
    // Para renderizar cuando modifique el estado
    const [currentPage, setCurrentPage] = useState(1);
    const lastRecipeInPage = currentPage * RECIPES_PER_PAGE;
    const firstRecipeInPage = lastRecipeInPage - RECIPES_PER_PAGE;
    // Se crea un array con las recetas que se mostrarán en la página actual
    // Se corta el array de todas las recetas con los dos indices inicial y final de la página
    const currentRecipes = allRecipes.slice(
        firstRecipeInPage,
        lastRecipeInPage
    );

    // Función para cambiar estado
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // useEffect sirve para que el renderizado se realice una sola vez cuando se monta el componente
    // el segundo parámetro es un array vacío, porque no se quiere que se ejecute nuevamente el useEffect
    // cuando se cambie el estado de recipes
    useEffect(() => {
        dispatch(getRecipes());
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getRecipes());
    };

    return (
        <>
            <h1>Busque su receta</h1>
            <button onClick={handleClick}>Recargar Recetas</button>
            <div className='search-container'>
                <input type='text' placeholder='Buscar recetas por nombre' />
                <button>Buscar</button>
            </div>
            <select name='' id=''>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select name='' id=''>
                <option value='vegan'>Vegana</option>
                <option value='ovo'>Ovo Lacteo Vegetariana</option>
                <option value='celiac'>Celiaca</option>
            </select>
            <Link to='/recipe'>Crear Receta</Link>

            {/* Renderiza las recetas */}
            <div>
                {!currentRecipes.length ? (
                    <h2>Cargando...</h2>
                ) : (
                    currentRecipes.map((recipe) => {
                        return (
                            <div className='recipe-card' key={recipe.recipe_id}>
                                <Card
                                    image={recipe.image}
                                    recipe_name={recipe.recipe_name}
                                    diets={recipe.diets}
                                />
                            </div>
                        );
                    })
                )}
            </div>

            {/* Cuando no carga por alguna razón las recetas, muestro mensaje 
            ARREGLAR, muestra el mensaje aunque todavía aun cuando esta esperando la respuesta */}
            {!allRecipes.length ? (
                <h4>
                    ¡Opss!, no hay recetas para mostrar esta vez, quizás la
                    próxima vez tengamos ganas de cocinar algo
                </h4>
            ) : null}

            <nav>
                <Paginated
                    allRecipes={allRecipes.length}
                    paginated={paginated}
                    RECIPES_PER_PAGE={RECIPES_PER_PAGE}
                />
            </nav>

        </>
    );
};

export default Home;

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
