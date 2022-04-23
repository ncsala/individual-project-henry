import React from 'react';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getDiets } from 'redux/actions/actions.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import styles from './CreateRecipe.module.css'

const CreateRecipe = () => {
    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.allDiets);
    const [msgError, setMsgError] = useState(false)
    const [msgSuccess, setMsgSuccess] = useState(false)

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    // Para los inputs del formulario
    const [input, setInput] = useState({
        recipe_name: '',
        dish_description: '',
        score: '',
        healthy_food_level: '',
        image: '',
        step_by_step: '',
        diets: [],
    });
    
    const regularExpressions = {
        recipe_name: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\-., ]{3,100}$/,
        dish_description: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\-., ]{8,150}$/,
        score: /^[1-9][0-9]?$|^100$/,
        healthy_food_level: /^[1-9][0-9]?$|^100$/,
        image: /^(http(s)?:\/\/)?((w){3}.)?(([a-zA-Z0-9-])+(\.)?)*(:\d{1,5})?(\/((\.)?(\?)?=?&?[a-zA-Z0-9-_]*)*)* $/,
        // image: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        step_by_step: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\-.,*() ]{10,800}$/,
    }
    
    // Para guardar los errores de cada input
    const [errors, setErrors] = useState({
        recipe_name: '',
        dish_description: '',
        score: '',
        healthy_food_level: '',
        image: '',
        step_by_step: '',
    });

    // Mensajes de error para mostrar debajo de los inputs 
    const errorMessages = {
        recipe_name: 'Entre 3 caracteres y 100 caracteres. Solo letras, puntos y comas.',
        dish_description: 'Entre 8 caracteres y 150 caracteres. Solo letras, puntos y comas.',
        score: 'El número debe estar entre 1 y 100',
        healthy_food_level: 'El número debe estar entre 1 y 100',
        image: 'Debe ingresar un URL válido',
        step_by_step: `Entre 10 caracteres y 800 caracteres. Solo letras, puntos, comas , asteriscos y paréntesis.`,
    }

    const regExpName = regularExpressions.recipe_name;
    const regExpDescription = regularExpressions.dish_description;
    const regExpScore = regularExpressions.score;
    const regExpHealthyFoodLevel = regularExpressions.healthy_food_level;
    const regExpImage = regularExpressions.image;
    const regExpStepByStep = regularExpressions.step_by_step;
    const inputName = input.recipe_name.trim();
    const inputDescription = input.dish_description.trim();
    const inputScore = input.score
    const inputHealthyFoodLevel = input.healthy_food_level
    const inputImage = input.image.trim();
    const inputStepByStep = input.step_by_step.trim();

    // Se valida independientemente cada valor ingresado por input
    const validation = (input, name) => {
        if (name === 'recipe_name') {
            if (!regExpName.test(inputName))
                setErrors({ ...errors, recipe_name: errorMessages.recipe_name })
            else setErrors({ ...errors, recipe_name: '' })
        }

        if (name === 'dish_description') {
            if (!regExpDescription.test(inputDescription))
                setErrors({ ...errors, dish_description: errorMessages.dish_description })
            else setErrors({ ...errors, dish_description: '' })
        }
        if (name === 'score') {
            // Si 'input.score' esta vacío no se valida porque es un campo opcional
            if (!regExpScore.test(inputScore) && input.score)
                setErrors({ ...errors, score: errorMessages.score })
            else setErrors({ ...errors, score: '' })
        }

        if (name === 'healthy_food_level') {
            if (!regExpHealthyFoodLevel.test(inputHealthyFoodLevel) && input.healthy_food_level)
                setErrors({ ...errors, healthy_food_level: errorMessages.healthy_food_level })
            else setErrors({ ...errors, healthy_food_level: '' })
        }

        if (name === 'image') {
            if ((inputImage.length >= 1 && inputImage.length < 5) || inputImage.length > 240) {
                setErrors({ ...errors, image: errorMessages.image })
            }
            else setErrors({ ...errors, image: '' })
        }

        if (name === 'step_by_step') {
            if (!regExpStepByStep.test(inputStepByStep))
                setErrors({ ...errors, step_by_step: errorMessages.step_by_step })
            else setErrors({ ...errors, step_by_step: '' })
        }
    }

    // Se validan todos los campos cuando se hace el submit
    const validationAll = () => {
        const error = { ...errors }
        if (!regExpName.test(inputName))
            error.recipe_name = errorMessages.recipe_name
        if (!regExpDescription.test(inputDescription))
            error.dish_description = errorMessages.dish_description
        if (!regExpScore.test(inputScore) && input.score)
            error.score = errorMessages.score
        if (!regExpHealthyFoodLevel.test(inputHealthyFoodLevel) && input.healthy_food_level) {
            error.healthy_food_level = errorMessages.healthy_food_level
        }
        if ((inputImage.length >= 1 && inputImage.length < 5) || inputImage.length > 150)
            error.image = errorMessages.image
        if (!regExpStepByStep.test(inputStepByStep))
            error.step_by_step = errorMessages.step_by_step

        return error
    }

    const clearErrorMsg = () => {
        if (
            // Verifico también el vació porque sino me metí en ningún formulario me deja darle enviar
            !errors.recipe_name &&
            !errors.dish_description &&
            !errors.step_by_step &&
            !errors.image &&
            !errors.healthy_food_level &&
            !errors.score
        ) {
            setMsgError(false)
        }
    }

    const handleChange = (event) => {
        // Name es el valor del atributo del input y su nombre tiene que corresponder al nombre de cada una de las propiedades del obj(eto recipe, según el input donde nos encontremos
        const { name, value } = event.target;
        // Nombre de la propiedad del objeto que se va a modificar y el value actual del input
        setInput({ ...input, [name]: value });
        validation({ ...input, [name]: value }, name)
        clearErrorMsg()
    };

    const handleCheckbox = (event) => {
        const { value, checked } = event.target;
        if (checked) setInput({ ...input, diets: [...input.diets, value] });
        if (!checked) setInput({ ...input, diets: input.diets.filter(diet => diet !== value) });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Si hay errores o los inputs están vacíos, no se puede enviar
        if (
            !input.recipe_name ||
            errors.recipe_name ||
            !input.dish_description ||
            errors.dish_description ||
            !input.step_by_step ||
            errors.step_by_step ||
            errors.image ||
            errors.healthy_food_level ||
            errors.score
        ) {
            setMsgError(true)
            // setTimeout(() => {
            //     setMsgError(false)
            // }, 3000)
            setErrors(validationAll())
        } else {
            dispatch(createRecipe(input))
            // DEBERÍA VERIFICAR DESDE EL BACK SI REALMENTE FUE CREADA
            setMsgSuccess(true)
            cleanForm(event.target)
            setTimeout(() => {
                setMsgSuccess(false)
            }, 3000)
        }
    }

    // Para resetear el formulario y limpiar los checkboxes cuando se haga el submit
    const cleanForm = (target) => {
        //Para limpiar checkboxes
        target.reset()
        setInput({
            recipe_name: '',
            dish_description: '',
            score: '',
            healthy_food_level: '',
            image: '',
            step_by_step: '',
            diets: [],
        });
    }

    return (
        <section className={styles.main_createRecipe}>
            <div className={styles.form_container}>
                <form onSubmit={handleSubmit} type="reset" className={styles.formulario}>
                    <fieldset className={styles.formulario__fieldset}>
                        <legend className={styles.formulario__legend}><h1>Crea una nueva receta llenando todos los campos</h1></legend>

                        <div className={styles.formulario__contenedorCampos}>
                            {/* Nombre de receta */}
                            <div className={styles.formulario__contenedorCampos__campo}>
                                <label className={styles.formulario__campo__label}
                                    htmlFor="recipe_name">
                                    Nombre de receta:
                                </label>
                                <input
                                    id="recipe_name"
                                    onChange={handleChange}
                                    type="text"
                                    name="recipe_name"
                                    value={input.recipe_name}
                                    className={styles.formulario__campo__inputTexto}
                                    placeholder="Ingrese nombre de la receta"
                                    autoComplete="off"
                                    onBlur={handleChange}
                                    onKeyUp={handleChange}
                                // minLength="3"
                                // maxLength="100"
                                />
                                {
                                    errors.recipe_name && <span className={styles.leyenda}>{errors.recipe_name}</span>
                                }
                            </div>

                            {/* Resumen de la receta */}
                            <div className={styles.formulario__contenedorCampos__campo}>
                                <label className={styles.formulario__campo__label}
                                    htmlFor="dish_description">
                                    Resumen de la receta:
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="dish_description"
                                    type="text"
                                    name="dish_description"
                                    value={input.dish_description}
                                    className={styles.formulario__campo__inputTexto}
                                    placeholder="Breve descripción de la receta"
                                    autoComplete="off"
                                    onBlur={handleChange}
                                    onKeyUp={handleChange}
                                // minLength="8"
                                // maxLength="100"
                                />
                                {
                                    errors.dish_description && <p className={styles.leyenda}>{errors.dish_description}</p>
                                }
                            </div>

                            {/* Puntaje */}
                            <div className={styles.formulario__contenedorCampos__campo}>
                                <label className={styles.formulario__campo__label}
                                    htmlFor="score">
                                    Calificación:
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="score"
                                    type="number"
                                    name="score"
                                    value={input.score}
                                    className={styles.formulario__campo__inputTexto}
                                    placeholder="Ingrese Número entre 1 y 100"
                                    onBlur={handleChange}
                                    onKeyUp={handleChange}
                                min="1"
                                max="100"
                                />
                                {
                                    errors.score && <p className={styles.leyenda}>{errors.score}</p>
                                }
                            </div>

                            {/* Score de comida saludable */}
                            <div className={styles.formulario__contenedorCampos__campo}>
                                <label className={styles.formulario__campo__label}
                                    htmlFor="healthy_food_level">
                                    Nivel de "comida saludable":
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="healthy_food_level"
                                    type="number"
                                    name="healthy_food_level"
                                    value={input.healthy_food_level}
                                    className={styles.formulario__campo__inputTexto}
                                    placeholder="Número del 1 al 100"
                                    onBlur={handleChange}
                                    onKeyUp={handleChange}
                                // min="1"
                                // max="100"
                                />
                                {errors.healthy_food_level && <p className={styles.leyenda}>{errors.healthy_food_level}</p>}
                            </div>

                            {/* URL de imagen */}
                            <div className={styles.formulario__contenedorCampos__campo}>
                                <label className={styles.formulario__campo__label}
                                    htmlFor="image">
                                    Imagen:
                                </label>
                                <input
                                    onChange={handleChange}
                                    id="image"
                                    type="text"
                                    name="image"
                                    value={input.image.trim()}
                                    className={styles.formulario__campo__inputTexto}
                                    placeholder="Ingrese un ULR de imagen"
                                    onBlur={handleChange}
                                    onKeyUp={handleChange}
                                // minLength="10"
                                // maxLength="500"
                                />
                                {errors.image && <p className={styles.leyenda}>{errors.image}</p>}
                            </div>

                            {/* Paso a paso */}
                            <div className={styles.formulario__contenedorCampos__campo}>
                                <label className={styles.formulario__campo__label}
                                    htmlFor="step_by_step">
                                    Instrucciones:
                                </label>
                                <textarea
                                    onChange={handleChange}
                                    id="step_by_step"
                                    type="text"
                                    name="step_by_step"
                                    value={input.step_by_step}
                                    className={styles.formulario__campo__inputTexto}
                                    placeholder="Ingrese el paso a paso de la receta"
                                    onBlur={handleChange}
                                    onKeyUp={handleChange}
                                />
                                {errors.step_by_step && <p className={styles.leyenda}>{errors.step_by_step}</p>}
                            </div>

                            {/* Type of diets */}
                            <div className={`${styles.formulario__contenedorCampos__campo} ${styles.campo__checkbox}`} >
                                {
                                    allDiets.length > 0 && allDiets.map(diet => (
                                        <div key={diet.id}>
                                            <label className={styles.formulario__campo__label} htmlFor="diets">{diet.type_of_diet_name}
                                                <input onChange={handleCheckbox} type="checkbox" value={diet.type_of_diet_name} name="diets" className={styles.input_checkBox} />
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* Mensaje de error debajo del formulario*/}
                            {msgError &&
                                <div className={styles.msg_error}>
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    <p><b>Error:</b> Por favor revise el formulario.</p>
                                </div>
                            }

                            {/* Mensaje de éxito debajo del formulario*/}
                            {msgSuccess &&
                                <div className={styles.msg_success}>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <p><b>Éxito:</b> La receta se ha creado correctamente.</p>
                                </div>
                            }

                        </div>

                        <div className={styles.contenedorBotones}>
                            <button className={`${styles.contenedorBotones__boton} ${styles.contenedorBotones__boton__widht100}`} type="submit" >Enviar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </section>
    );
};

export default CreateRecipe