const { Router } = require('express');
const router = Router();

const { Recipe, Type_of_diet } = require('../db');

const { getBdAndApiRecipes } = require('../services/fetchRecipes');

// GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get('/', async (request, response) => {
	try {
		// Desestructuro la query que viene en el request
		const { name } = request.query;

		// Se trae la data de la API y la BD
		const allRecipes = await getBdAndApiRecipes();

        // Si no viene ningún nombre por query mostrar todas las recetas
        if (!name) response.send(allRecipes);

		if (name) {
			// Filtro las recetas que contengan el nombre ingresado por query
			const filteredRecipes = allRecipes.filter((recipe) =>
				recipe.recipe_name?.toLowerCase().includes(name.toLowerCase())
			);

			// Si existe alguna receta mostrarla
			if (filteredRecipes.length) response.json(filteredRecipes);

			// Si no existe ninguna receta con ese nombre mostrar un mensaje adecuado
			if (!filteredRecipes.length) {
				response.status(400).json({
					message: 'La receta que buscas se perdió en algún momento',
				});
			}
		}
	
    // Si hay error capturarlo e informar que no se puede obtener la data
	} catch (error) {
		response.status(500).send({
			message: 'No se pudo obtener la información de la API ni de la Base de Datos. Error interno del servidor',
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
        
        if (!id) response.send(allRecipes);
		
        if (id) {
			// Se filtra la receta que coincida con el id de la request
            // Se usa solo doble igual porque de la base de datos vienen como string
            // y en la api como number
			const filteredRecipe = allRecipes.filter(
				(recipe) => recipe.recipe_id == id
			);

			// Si no existe ninguna receta con ese id mostrar un mensaje adecuado
			if (!filteredRecipe.length) {
				response.status(404).json({
					message: 'Ops, parece que la página ya no existe.',
				});
			}
            
			// Si existe alguna receta mostrarla
			if (filteredRecipe.length) response.json(filteredRecipe);
		}

		// Si no viene ningún id de params mostrar todas las recetas
	} catch (error) {
		// Si hay error capturarlo e informar que no se puede obtener la data
		response.status(500).send({
			message:
				'No se pudo obtener la información de la API ni de la Base de Datos. Error interno del servidor',
		});
	}
});

module.exports = router;
