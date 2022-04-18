import React from 'react';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createRecipe, getDiets } from 'redux/actions/actions.js';

import styles from './CreateRecipe.module.css'

const CreateRecipe = () => {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.allDiets);


    // Para guardar el formulario
    const [recipe, setRecipe] = useState({
        recipe_name: '',
        dish_description: '',
        score: '',
        healthy_food_level: '',
        image: '',
        diets: [],
        step_by_step: '',
    });

    useEffect(() => {
        dispatch(getDiets())
    }, [])

    const [diets, setDiets] = useState([]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecipe(recipe));
    };

    return (
        <section className="recipe-create">
            <h1>Nueva Receta</h1>
            <form onSubmit={handleSubmit} className={styles.formulario}>
                <fieldset class={styles.formulario__fieldset}>
                    <legend class={styles.formulario__legend}>Crea una nueva receta llenando todos los campos</legend>
                    <div class={styles.formulario__contenedorCampos}>

                        <div class={styles.formulario__contenedorCampos__campo}>
                            <label class={styles.formulario__campo__label}
                                for="recipe_name">
                                Nombre de receta:
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="recipe_name"
                                value={recipe.recipe_name}
                                class={styles.formulario__campo__inputTexto}
                                placeholder="Ingrese nombre de la receta"
                                required
                            />
                        </div>

                        <div class={styles.formulario__contenedorCampos__campo}>
                            <label class={styles.formulario__campo__label}
                                for="dish_description">
                                Resumen de la receta:
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="dish_description"
                                value={recipe.dish_description}
                                class={styles.formulario__campo__inputTexto}
                                placeholder="Ingrese una breve descripción de la receta"
                                required
                            />
                        </div>

                        <div class={styles.formulario__contenedorCampos__campo}>
                            <label class={styles.formulario__campo__label}
                                for="score">
                                Calificación:
                            </label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="score"
                                value={recipe.score}
                                class={styles.formulario__campo__inputTexto}
                                placeholder="Ingrese una calificación numérica para la receta"
                            />
                        </div>

                        <div class={styles.formulario__contenedorCampos__campo}>
                            <label class={styles.formulario__campo__label}
                                for="healthy_food_level">
                                Nivel de "comida saludable":
                            </label>
                            <input
                                onChange={handleChange}
                                type="number"
                                name="healthy_food_level"
                                value={recipe.healthy_food_level}
                                class={styles.formulario__campo__inputTexto}
                                placeholder="Ingrese una calificación numérica en base a lo saludable de la receta"
                                min="1"
                                max="10"
                            />
                        </div>

                        <div class={styles.formulario__contenedorCampos__campo}>
                            <label class={styles.formulario__campo__label}
                                for="image">
                                Imagen:
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="image"
                                value={recipe.image}
                                class={styles.formulario__campo__inputTexto}
                                placeholder="Ingrese el ULR de la imagen"
                            />
                        </div>

                        <div class={styles.formulario__contenedorCampos__campo}>
                            <label class={styles.formulario__campo__label}
                                for="step_by_step">
                                Instrucciones:
                            </label>
                            <textarea
                                onChange={handleChange}
                                type="text"
                                name="step_by_step"
                                value={recipe.step_by_step}
                                class={styles.formulario__campo__inputTexto}
                                placeholder="Ingrese el paso a paso de la receta"
                            />
                        </div>

                        <div className={`${styles.formulario__contenedorCampos__campo} ${styles.campo__checkbox}`} >
                            {
                                allDiets.length > 0 && allDiets.map(diet => (
                                    <div key={diet.id}>
                                        <label className={styles.formulario__campo__label} htmlFor="diets">{diet.type_of_diet_name} 
                                            <input type="checkbox" value={diet.id} name="diets" id={diet.id}/>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>


                    </div>

                    <div class={styles.contenedorBotones}>
                        <button class={`${styles.contenedorBotones__boton} ${styles.contenedorBotones__boton__widht100}`} type="submit">Enviar</button>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default CreateRecipe