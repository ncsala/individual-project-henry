const { Router } = require('express');
const router = Router();

const { getBdAndApiRecipes } = require('../services/fetchRecipes');

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get('/', async (request, response) => {
	try {
		// throw new Error('No se puede conectar a la base de datos');
		const { name } = request.query;

		const allRecipes = await getBdAndApiRecipes();

		//Si no viene ningún nombre y las recetas vienen vaciás se muestra un mensaje
		if (!name && !allRecipes.length) {
			return response.status(400).send({
				message: 'Todavía no hay recetas en la base de datos',
			});
		}

		// Si no viene ningún nombre por query mostrar todas las recetas
		if (!name) response.send(allRecipes);

		if (name) {
			// Filtro las recetas que contengan el nombre ingresado por query
			const filteredRecipes = allRecipes.filter((recipe) =>
				recipe.recipe_name?.toLowerCase().includes(name.toLowerCase())
			);

			// Si existe alguna receta mostrarla
			if (filteredRecipes.length) response.send(filteredRecipes);

			// Si no existe ninguna receta con ese nombre mostrar un mensaje adecuado
			if (!filteredRecipes.length) {
				response.status(400).send({
					message: 'La receta que buscas se perdió en algún momento',
				});
			}
		}
	} catch (error) {
		response.status(500).send({
			message: `No se pudo obtener la información de la API ni de la Base de Datos. 
                Error interno del servidor`,
		});
	}
});

//  GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get('/:id', async (request, response) => {
	try {
		// Se desestructura el id de params de la request
		const { id } = request.params;
		// Se trae la data de la API y la BD
		const allRecipes = await getBdAndApiRecipes();

		// Se filtra la receta que coincida con el id de la request
		const filteredRecipe = allRecipes.filter(
			(recipe) => recipe.recipe_id == id
		);

		// Si no existe ninguna receta con ese id mostrar un mensaje adecuado
		if (!filteredRecipe.length) {
			response.status(404).send({
				message: 'Ops, parece que la página ya no existe.',
			});
		}

		// Si existe alguna receta mostrarla
		if (filteredRecipe.length) response.send(filteredRecipe);
	} catch (error) {
		response.status(500).send({
			message:
				'No se pudo obtener la información de la API ni de la Base de Datos. Error interno del servidor',
		});
	}
});

module.exports = router;
