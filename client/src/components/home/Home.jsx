import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getRecipes } from '../../redux/actions/actions';


// Input de búsqueda para encontrar recetas por nombre
// Área donde se verá el listado de recetas. Deberá mostrar su:
// Imagen
// Nombre
// Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
// Botones/Opciones para filtrar por por tipo de dieta
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
// Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.
const Home = () => {

    const dispatch = useDispatch()
    
    // Se trae en la constante todo lo que esta en el estado de recipes
    const allRecipes = useSelector((state) => state.recipes)

    // useEffect sirve para que el renderizado se realice una sola vez cuando se monta el componente
    // el segundo parámetro es un array vacío, porque no se quiere que se ejecute nuevamente el useEffect
    // cuando se cambie el estado de recipes
    useEffect(() => {
        dispatch(getRecipes())
    }, [])

    const handleClick = (event) => {
        event.preventDefault()
        dispatch(getRecipes())
    }

    return (
        <>
            <h1>Busque su receta</h1>
            <button onClick={handleClick}>Recargar Recetas</button>
            <div className="search-container">
                <input type="text" placeholder="Buscar recetas por nombre" />
                <button>Buscar</button>
            </div>
            <select name="" id="">
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select name="" id="">
                <option value="vegan">Vegana</option>
                <option value="ovo">Ovo Lacteo Vegetariana</option>
                <option value="celiac">Celiaca</option>
            </select>
            <Link to='/recipe'>
                Crear Receta
            </Link>
            <div className="recipes-container">
                {allRecipes.map((recipe) => {
                    return (
                        <div className="recipe-card" key={recipe.recipe_id}>
                            <img src={recipe.image} alt={recipe.recipe_name} />
                            <h2>{recipe.recipe_name}</h2>
                            <p>{recipe.diets}</p>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default Home;
