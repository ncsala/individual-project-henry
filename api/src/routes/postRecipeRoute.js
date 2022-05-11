const { Router } = require('express');
const { Recipe, Type_of_diet } = require('../db');

const router = Router();

// POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
router.post('/', async (request, response, next) => {
	try {
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
			score: score ? score : null,
			healthy_food_level: healthy_food_level ? healthy_food_level : null,
			step_by_step,
			image,
			created_in_db,
		});

		// Se traen los tipos de dieta de la base de datos
		// que coincidan con los que se reciben en la request por body
		const dietTypeDb = await Type_of_diet.findAll({
			where: {
				type_of_diet_name: diets,
			},
		});

		newRecipe.addType_of_diet(dietTypeDb);

		// Si se crea correctamente la receta se muestra el mensaje de éxito
		if (newRecipe) {
			response.status(201).send({
				message: 'Receta creada correctamente',
			});
		}

		response.status(404).send({ 
            message: 'No se pudo crear la receta' 
        });
	} catch (error) {
		next(error);
		response.status(500).send({
			message: 'Hubo un error al crear la receta',
		});
	}
});

module.exports = router;
