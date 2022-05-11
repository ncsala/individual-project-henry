require('dotenv').config();
const fetch = require('node-fetch');

let changeKeyNumber = 2;
let apiKey = process.env[`API_KEY${changeKeyNumber}`];

// Se traen los modelos de la base de datos
const { Recipe, Type_of_diet } = require('../db');

// Se obtiene la información de la API
const getApiRecipes = async () => {
	try {
		let response = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${apiKey}`
		);

		// data = {results: [{receta1}, {receta2}, {receta3}]}, offset = 0, ...}
		let data = await response.json();

        // Esto es lo que recibo cuando llego al limite diario de peticiones a la API
		// {
		//     "status": "failure",
		//     "code": 402,
		//     "message": "Your daily points limit of 150 has been reached. Please upgrade your plan to continue using the API."
		//   }
        // Cambio dinámicamente la key de la API
		if (data.status === 'failure') {
			while (await data.status === 'failure') {
				changeKeyNumber++;
				apiKey = process.env[`API_KEY${changeKeyNumber}`];
				let response = await fetch(
					`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=15&apiKey=${apiKey}`
				);
				data = await response.json();
                if (data.status !== 'failure') {   
                    break;
                }
                console.log('API_KEY', apiKey);
			}
		}

		// recipes = [{receta1}, {receta2}, {receta3}]
		const recipes = await data.results?.map((recipe) => {
			return {
				recipe_id: recipe.id,
				recipe_name: recipe.title,
				dish_description: recipe.summary,
				score: recipe.spoonacularScore,
				healthy_food_level: recipe.healthScore,
				step_by_step: recipe.analyzedInstructions[0],
				diets: recipe.diets,
				image: recipe.image,
				created_in_db: false,
			};
		});

		// return []
		// Compruebo que venga algo en recipes para que no se rompa si la api no devuelve nada,
		// y devuelvo array vacío
		return recipes ? recipes : [];
	} catch (error) {
		console.log(error);
		return [];
	}
};

// Se obtiene la información de la BD
const getDbRecipes = async () => {
	try {
		const dbData = await Recipe.findAll({
			include: {
				model: Type_of_diet,
				attributes: ['type_of_diet_name'],
				through: {
					attributes: [],
				},
			},
		});

		// Formatear la información que se trae de la base de datos
		// Para que quede igual que la API
		const recipes = await dbData.map((recipe) => {
			return {
				recipe_id: recipe.recipe_id,
				recipe_name: recipe.recipe_name,
				dish_description: recipe.dish_description,
				score: recipe.score,
				healthy_food_level: recipe.healthy_food_level,
				step_by_step: recipe.step_by_step,
				diets: recipe.type_of_diets.map((diet) => {
					return diet.type_of_diet_name;
				}),
				image: recipe.image,
				created_in_db: true,
			};
		});

		// return []
		return recipes ? recipes : [];
	} catch (error) {
		console.error(error);
		return [];
	}
};

// Se concatena la información de la API con la de la BD
const getBdAndApiRecipes = async () => {
	const apiRecipes = await getApiRecipes();
	const dbRecipes = await getDbRecipes();
	const allRecipes = [...apiRecipes, ...dbRecipes];

	return allRecipes;
};

module.exports = {
	getApiRecipes,
	getDbRecipes,
	getBdAndApiRecipes,
};
