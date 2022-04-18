require('dotenv').config();
const { Router } = require('express');
const fetch = require('node-fetch');
const apiKey = process.env.API_KEY1
const { Recipe, Type_of_diet } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Se obtiene la información de la API
const getApiRecipes = async () => {
	// Se obtiene la información de la API
	const response = await fetch(
		`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=15&apiKey=${apiKey}`
	);

	// Se convierte la respuesta de un objeto JSON a un objeto de JS
	const data = await response.json();

	// Se mapea solo los datos que se necesitan
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
			created_in_db: true,
			// sourceUrl: recipe.sourceUrl,
			// servings: recipe.servings,
			// readyInMinutes: recipe.readyInMinutes,
		};
	});

	// Compruebo que venga algo en recipes para que no se rompa si la api no devuelve nada.
	// Devuelvo string sino devuelve nada
	return recipes ? recipes : [];
};

// Se obtiene la información de la BD
// Trae todas las recetas de la BD y además incluye el modelo Type_of_diet
// con el atributo type_of_diet_name
// Puse un try por si hay un error en la BD(?)
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

		const recipes = await dbData.map((recipe) => {
			return {
				recipe_id: recipe.recipe_id,
				recipe_name: recipe.recipe_name,
				dish_description: recipe.dish_description,
				score: recipe.score,
				healthy_food_level: recipe.healthy_food_level,
				step_by_step: recipe.step_by_step,
                diets: recipe.type_of_diets.map((diet) => {
                    return diet.type_of_diet_name
                }),
				image: recipe.image,
				created_in_db: true,
			};
		});

        return recipes;

	} catch (error) {
		// Si hay un error en la BD, se devuelve un array vacío y se loguea el error
		console.error(error);
		return [];
	}

	// try {
	// 	return await Recipe.findAll({
	// 		include: {
	// 			model: Type_of_diet,
	// 			attributes: ['type_of_diet_name'],
	// 			through: {
	// 				attributes: [],
	// 			},
	// 		},
	// 	});
	// } catch (error) {
	// 	// Si hay un error en la BD, se devuelve un array vacío y se loguea el error
	// 	console.error(error);
	// 	return [];
	// }
};

// Se concatena la información de la API con la de la BD
const getBdAndApiRecipes = async () => {
	const apiRecipes = await getApiRecipes();
	const dbRecipes = await getDbRecipes();

	const allRecipes = [...apiRecipes, ...dbRecipes];
	// const allRecipes = apiRecipes.concat(dbRecipes);

	return allRecipes;
};

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get('/recipes', async (request, response) => {
	try {
		// Desestructuro la request que viene por query
		const { name } = request.query;
		// Se trae la data de la API y la BD
		const recipes = await getBdAndApiRecipes();
		if (name) {
			// Filtro las recetas que contengan el nombre ingresado por query
			const filteredRecipes = recipes.filter((recipe) =>
				recipe.recipe_name.toLowerCase().includes(name.toLowerCase())
			);
			// Si existe alguna receta mostrarla
			if (filteredRecipes.length) response.json(filteredRecipes);
			// Si no existe ninguna receta con ese nombre mostrar un mensaje adecuado
			if (!filteredRecipes.length) {
				response.status(404).json({
					message: 'La receta que buscas se perdió en algún momento',
				});
			}
		}
		// Si no viene ningún nombre por query mostrar todas las recetas
		if (!name) response.send(recipes);
		// Si hay error capturarlo e informar que no se puede obtener la data
	} catch (error) {
		response.status(500).send({
			//CAMBIAR ERROR POR MENSAJE
			message: error,
		});
	}
});

//  GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get('/recipes/:id', async (request, response) => {
	try {
		// Se desestructura el id de params de la request
		const { id } = request.params;
		// Se trae la data de la API y la BD
		const recipes = await getBdAndApiRecipes();
		if (id) {
			// Se filtra la receta que coincida con el id de la request
			const filteredRecipes = recipes.filter(
				(recipe) => recipe.recipe_id === parseInt(id)
			);
			// Si no existe ninguna receta con ese id mostrar un mensaje adecuado
			if (!filteredRecipes.length) {
				response.status(404).json({
					message: 'La receta que buscas se perdió en algún momento',
				});
			}
			// Si existe alguna receta mostrarla
			if (filteredRecipes.length) response.json(filteredRecipes);
		}
		// Si no viene ningún id de params mostrar todas las recetas
		if (!id) response.send(recipes);
	} catch (error) {
		// Si hay error capturarlo e informar que no se puede obtener la data
		response.status(500).send({
			message:
				'No se pudo obtener la información de la API ni de la Base de Datos',
		});
	}
});

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get('/types', async (request, response) => {
	try {
		// Se busca en BD si existen tipos de dieta
		const types = await Type_of_diet.findAll();
		// Si no existen tipos de dieta en BD se cargan los tipos de dieta indicados por spoonacular
		// y se guardan en BD
		// bulkcreate es una función que permite crear varios registros en una sola instrucción
		if (!types.length) {
			const types = await Type_of_diet.bulkCreate([
				{ type_of_diet_name: 'gluten free' },
				{ type_of_diet_name: 'ketogenic' },
				{ type_of_diet_name: 'vegetarian' },
				{ type_of_diet_name: 'ovo-vegetarian' },
				{ type_of_diet_name: 'lacto-vegetarian' },
				{ type_of_diet_name: 'vegan' },
				{ type_of_diet_name: 'pescetarian' },
				{ type_of_diet_name: 'paleo' },
				{ type_of_diet_name: 'primal' },
				{ type_of_diet_name: 'low fodmap' },
				{ type_of_diet_name: 'whole30' },
				{ type_of_diet_name: 'dairy free' },
				{ type_of_diet_name: 'lacto ovo vegetarian' },
				{ type_of_diet_name: 'paleolithic' },
				{ type_of_diet_name: 'primal' },
			]);
			response.json(types);
		}
		// Si existen tipos de dieta mostrarlos
		if (types.length) response.json(types);
	} catch (error) {
		// Si hay error capturarlo e informar que no se puede obtener la data
		response.status(500).send({
			message: 'No se pudo obtener la información solicitada',
		});
	}
});

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.post('/recipe', async (request, response) => {
    console.log(request.body);
	try {
		// Se desestructura el body de la request
		const {
			recipe_name,
			dish_description,
			score,
			healthy_food_level,
			step_by_step,
			image,
			created_in_db,
			diets,
		} = request.body;
		// Se crea una nueva receta en la base de datos
		const newRecipe = await Recipe.create({
			recipe_name,
			dish_description,
			score,
			healthy_food_level,
			step_by_step,
			image,
			created_in_db,
		});

		// Se traen los tipos de dieta de la base de datos
		// que coincidan con los que se reciben en la request por body
		const dietTypeDb = await Type_of_diet.findAll({
			where: { type_of_diet_name: diets },
		});

		newRecipe.addType_of_diet(dietTypeDb);

		// Si se crea correctamente la receta se muestra el mensaje de éxito
		if (newRecipe) {
			response.status(201).json({
				message: 'Receta creada correctamente',
			});
		}
	} catch (error) {
		// Si hay error capturarlo e informar que no se puede obtener la data
		response.status(500).send({
			message: 'No se pudo crear la receta',
		});
	}
});

module.exports = router;
