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
		if (!errors.recipe_name && !errors.dish_description) {
			dispatch(createRecipe(recipe))
			alert('Su receta ha sido creada con éxito!')
			// DEBERÍA VERIFICAR DESDE EL BACK SI REALMENTE FUE CREADA
			// Para resetear el formulario y limpiar los checkboxes
			cleanForm(event.target)
		} else {
			alert('Por favor, revise los errores en el formulario')
		}
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
									value={recipe.recipe_name}
									className={styles.formulario__campo__inputTexto}
									placeholder="Ingrese nombre de la receta"
									minLength="3"
									maxLength="100"
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
									value={recipe.dish_description}
									className={styles.formulario__campo__inputTexto}
									placeholder="Breve descripción de la receta"
									minLength="8"
									maxLength="100"
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
									value={recipe.score}
									className={styles.formulario__campo__inputTexto}
									placeholder="Ingrese Número entre 1 y 100"
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
									value={recipe.healthy_food_level}
									className={styles.formulario__campo__inputTexto}
									placeholder="Número del 1 al 100"
									min="1"
									max="100"
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
									value={recipe.image}
									className={styles.formulario__campo__inputTexto}
									placeholder="Ingrese un ULR de imagen"
									minLength="10"
									maxLength="500"
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
									value={recipe.step_by_step}
									className={styles.formulario__campo__inputTexto}
									placeholder="Ingrese el paso a paso de la receta"
								/>
								{errors.step_by_step && <p className={styles.leyenda}>{errors.step_by_step}</p>}
							</div>

							{/* Type of diets */}
							<div className={`${styles.formulario__contenedorCampos__campo} ${styles.campo__checkbox}`} >
								{
									allDiets.length > 0 && allDiets.map(diet => (
										<div key={diet.id}>
											<label className={styles.formulario__campo__label} htmlFor="diets">{diet.type_of_diet_name}
												<input onChange={handleCheckbox} type="checkbox" value={diet.type_of_diet_name} name="diets" />
											</label>
										</div>
									))
								}
							</div>

							{/* Mensaje de error */}
							{ false &&
                                <div className={styles.error}>
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    <p><b>Error:</b> Por favor rellene el formulario correctamente.</p>
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