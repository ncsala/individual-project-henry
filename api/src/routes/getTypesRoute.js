const { Router } = require('express');

const { Type_of_diet } = require('../db');

const router = Router();

// GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get('/', async (request, response, next) => {
	try {
		// Se busca en BD si existen tipos de dieta
		const types = await Type_of_diet.findAll();

		// Si no existen tipos de dieta en BD se cargan los tipos de dieta indicados por spoonacular
		// y se guardan en BD
		if (!types.length) {
			const types = await Type_of_diet.bulkCreate([
				{ type_of_diet_name: 'gluten free' },
				{ type_of_diet_name: 'dairy free' },
				{ type_of_diet_name: 'vegan' },
				{ type_of_diet_name: 'lacto ovo vegetarian' },
				{ type_of_diet_name: 'pescetarian' },
				{ type_of_diet_name: 'low fodmap' },
				{ type_of_diet_name: 'whole30' },
				{ type_of_diet_name: 'ketogenic' },
				{ type_of_diet_name: 'primal' },
				{ type_of_diet_name: 'paleolithic' },
			]);
			response.json(types);
		}

		if (types.length) response.json(types);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
