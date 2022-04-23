import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getDetail } from 'redux/actions/actions';
import PrintsImage from 'components/prints-image/PrintsImage';

import styles from './RecipeDetail.module.css';

const RecipeDetail = (props) => {
	const dispatch = useDispatch();
	const recipeDetail = useSelector((state) => state.recipeDetails);
	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	return (
		<>
			<div>
				<Link to='/recipes'>Volver</Link>
			</div>

			{recipeDetail.length > 0 ? (
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

							{/* {recipeDetail.created_in_db === true ? (
								<p>{recipeDetail.step_by_step}</p>
							) : (
								recipeDetail.step_by_step.steps?.map((step) => {
									return (
										<li key={step.number}>
											Paso: {step.number}: {step.step}
										</li>
									);
								})
							)} */}

							<PrintsImage
								image={recipeDetail.image}
								name={recipeDetail.recipe_name}
							/>

							<h4>Diets: {recipeDetail.diets}</h4>
						</section>
					);
				})
			) : (
				<span>Cargando...</span>
			)}
		</>
	);
};

export default RecipeDetail;
