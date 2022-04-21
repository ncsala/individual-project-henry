import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import defaultRecipeImg from '../../assets/cooking.png';
import { getDetail } from 'redux/actions/actions';

const RecipeDetail = (props) => {
	const dispatch = useDispatch();
	const recipeDetail = useSelector((state) => state.recipeDetails);
	const { id } = useParams();

    console.log(recipeDetail)

	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	console.log(recipeDetail);
	return (
		<>
			<div>
				<Link to='/recipes'>Volver</Link>
			</div>

			{recipeDetail.length > 0 ? (
				recipeDetail.map((recipeDetail) => {
					return (
						<div key={recipeDetail.recipe_id}>
							<h2>{recipeDetail.recipe_name}</h2>
							<h3>{recipeDetail.dish_description}</h3>
							<h4>Score: {recipeDetail.score}</h4>
							<h4>Healthy Food Level: {recipeDetail.healthy_food_level}</h4>
							{/* <p>{recipeDetail.step_by_step}</p> */}
							{!recipeDetail.image ? (
								<img
									src={defaultRecipeImg}
									alt='Imagen predeterminada'
								/>
							) : (
								<img
									src={recipeDetail.image}
									alt={
										'Imagen receta de ' +
										recipeDetail.recipe_name
									}
								/>
							)}
							<h4>Diets: {recipeDetail.diets}</h4>
						</div>
					);
				})
			) : (
				<div>Cargando...</div>
			)}
		</>
	);
};

export default RecipeDetail;
