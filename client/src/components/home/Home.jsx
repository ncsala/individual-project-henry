import React from 'react';
// Importación de Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRecipes } from 'redux/actions/actions';

// Componentes
import Paginated from 'components/paginated/Paginated';
import Cards from 'components/cards/Cards';
import Filters from 'components/filters/Filters';

import styles from './Home.module.css'

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
    const filteredRecipes = useSelector((state) => state.filteredRecipes);
    // Se traen los errores del estado global
    const error = useSelector((state) => state.msgError);

    // Estados para renderizar por orden alfabético y por puntaje
    const [order, setOrder] = useState('disorderly');

    // PAGINACIÓN ----------------------------------------------------------------------------------------------------
    // Se crea la paginación de 9 recetas por pagina
    // Para renderizar cuando modifique el estado
    const [currentPage, setCurrentPage] = useState(1);
    const lastRecipeInPage = currentPage * RECIPES_PER_PAGE;
    const firstRecipeInPage = lastRecipeInPage - RECIPES_PER_PAGE;
    // Se crea un array con las recetas que se mostrarán en la página actual
    // Se corta el array de todas las recetas con los dos indices inicial y final de la página
    // Pregunto si es un array porque si no es un array, no se puede hacer el slice
    let currentRecipes = Array.isArray(filteredRecipes) ? filteredRecipes.slice(firstRecipeInPage, lastRecipeInPage) : [];
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

    return (
        <main className={styles.main_home}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Busque su receta</h1>
            </div>

            {/* Componente Filtros */}
            <Filters
                setPage={setCurrentPage}
                order={order}
                setOrder={setOrder}
                setCurrentPage={setCurrentPage}
            />

            <nav className={styles.paginated}>
                <Paginated
                    allRecipes={filteredRecipes.length}
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
        </main>
    );
};

export default Home;
