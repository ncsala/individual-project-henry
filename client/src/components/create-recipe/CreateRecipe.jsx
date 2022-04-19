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
        step_by_step: '',
        diets: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getDiets())
    }, [])

    const validation = (recipe) => {
        const errors = {}
        if (recipe.recipe_name.length < 3) errors.recipe_name = 'El nombre de la receta debe tener al menos 3 caracteres'
        if (recipe.dish_description.length < 8) errors.dish_description = 'La descripción de la receta debe tener al menos 8 caracteres'
        if (recipe.dish_description.length > 100) errors.dish_description = 'La descripción de la receta no puede tener más de 100 caracteres'
        if (recipe.score < 1 || recipe.score > 100) errors.score = 'El número debe estar entre 1 y 100'
        if (recipe.healthy_food_level < 1 || recipe.healthy_food_level > 100) errors.healthy_food_level = 'El número debe estar entre 1 y 100'
        if (recipe.image.length < 3) errors.image = 'Debe ingresar una URL válida para la imagen'
        if (recipe.step_by_step.length > 800) errors.step_by_step = 'El paso a paso de la receta no puede tener más de 800 caracteres'

        return errors
    }

    const handleChange = (event) => {
        // name es el valor del atributo del input y su nombre tiene que corresponder al nombre de cada una de las propiedades del obj(eto recipe, según el input donde nos encontremos
        const { name, value } = event.target;
        // Nombre de la propiedad del objeto que se va a modificar y el value actual del input
        setRecipe({ ...recipe, [name]: value });
        setErrors(validation({ ...recipe, [name]: value }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecipe(recipe));
        alert('Su receta ha sido creada con éxito!')
        // Para resetear el formulario y limpiar los checkboxes
        cleanForm(event.target)
    }

    const cleanForm = (target) => {
        //Para limpiar checkboxes
        target.reset()
        setRecipe({
            recipe_name: '',
            dish_description: '',
            score: '',
            healthy_food_level: '',
            image: '',
            step_by_step: '',
            diets: [],
        });
    }

    const handleCheckbox = (event) => {
        const { value, checked } = event.target;
        if (checked) setRecipe({ ...recipe, diets: [...recipe.diets, value] });
        if (!checked) setRecipe({ ...recipe, diets: recipe.diets.filter(diet => diet !== value) });
    };

    return (
        <section className="recipe-create">
            <form onSubmit={handleSubmit} type="reset" className={styles.formulario}>
                <fieldset class={styles.formulario__fieldset}>
                    <legend class={styles.formulario__legend}><h1>Crea una nueva receta llenando todos los campos</h1></legend>
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
                            {
                                errors.recipe_name && <span class={styles.error}>{errors.recipe_name}</span>
                            }
                        </div>

                        {/* Resumen de la receta */}
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
                            {
                                errors.dish_description && <p class={styles.error}>{errors.dish_description}</p>
                            }
                        </div>

                        {/* Puntaje */}
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
                                placeholder="Ingrese una calificación numérica entre 1 y 100"
                                min="1"
                                max="100"
                            />
                            {
                                errors.score && <p class={styles.error}>{errors.score}</p>
                            }
                        </div>

                        {/* Score de comida saludable */}
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
                                placeholder="Ingrese un score numérico del 1 al 100 del nivel saludable de la receta"
                                min="1"
                                max="100"
                            />
                            {errors.healthy_food_level && <p class={styles.error}>{errors.healthy_food_level}</p>}
                        </div>

                        {/* URL de imagen */}
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
                                placeholder="Ingrese un ULR válido de la imagen"
                            />
                            {errors.image && <p class={styles.error}>{errors.image}</p>}
                        </div>

                        {/* Paso a paso */}
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
                            {errors.step_by_step && <p class={styles.error}>{errors.step_by_step}</p>}
                        </div>

                        {/* Type of diets */}
                        <div className={`${styles.formulario__contenedorCampos__campo} ${styles.campo__checkbox}`} >
                            {
                                allDiets.length > 0 && allDiets.map(diet => (
                                    <div key={diet.id}>
                                        <label className={styles.formulario__campo__label} htmlFor="diets">{diet.type_of_diet_name}
                                            <input onChange={handleCheckbox} type="checkbox" value={diet.id} name="diets" />
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