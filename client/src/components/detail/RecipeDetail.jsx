import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getDetail } from 'redux/actions/actions';
import PrintsImage from 'components/prints-image/PrintsImage.jsx';

import styles from './RecipeDetail.module.css';

const RecipeDetail = () => {
	const dispatch = useDispatch();
	const recipeDetail = useSelector((state) => state.recipeDetails);
	console.log(recipeDetail);
	const errors = useSelector((state) => state.msgDetailError);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	return (
		<>
			{(errors.length && <div className={styles.error}>{errors}</div>) ||
				recipeDetail.map((recipeDetail) => {
					return (
						<section
							key={recipeDetail.recipe_id}
							className={styles.container}
						>
							<h2>{recipeDetail.recipe_name}</h2>

							{/* <p>Resumen: {recipeDetail.dish_description.replace(/<\/?[^>]+(>|$)/g, "")}</p> */}
							<p
								dangerouslySetInnerHTML={{
									__html: `${recipeDetail.dish_description}`,
								}}
							></p>

							<h4>Puntuación: {recipeDetail.score}</h4>
							<h4>
								Nivel de comida saludable:{' '}
								{recipeDetail.healthy_food_level}
							</h4>

							{Object.prototype.toString.call(
								recipeDetail.step_by_step
							) === '[object Object]' ? (
								recipeDetail.step_by_step.steps.map((step) => {
									return (
										<li key={step.number}>
											Paso {step.number}: {step.step}
										</li>
									);
								})
							) : (
								<p>{recipeDetail.step_by_step}</p>
							)}

							<PrintsImage
								image={recipeDetail.image}
								name={recipeDetail.recipe_name}
							/>

							<h4>Diets: {recipeDetail.diets}</h4>
						</section>
					);
				})}
		</>
	);
};

export default RecipeDetail;
