const { Router } = require('express');
const {Recipe, Type_of_diet} = require('../db.js');
const router = Router();

router.put('/:id', async (request, response) => {

    try {
        const { id } = request.params;
	const {
		recipe_name,
		dish_description,
		score,
		healthy_food_level,
		step_by_step,
		image,
		diets,
		removeDiets,
	} = request.body;

	const updateRecipe = await Recipe.findByPk(id);

	updateRecipe.recipe_name = recipe_name;
	updateRecipe.dish_description = dish_description;
	updateRecipe.score = score;
	updateRecipe.healthy_food_level = healthy_food_level;
	updateRecipe.step_by_step = step_by_step;
	updateRecipe.image = image;
	updateRecipe.create_in_db = true;

	await updateRecipe.save();
    
    const removeDietTypeDB = await Type_of_diet.findAll({
        where: { type_of_diet_name: removeDiets },
    });
    // Se eliminan los tipos de dieta de la receta
    updateRecipe.removeType_of_diet(removeDietTypeDB);

	const dietTypeDb = await Type_of_diet.findAll({
		where: { type_of_diet_name: diets },
	});

	updateRecipe.addType_of_diet(dietTypeDb);

	if (updateRecipe) {
		response.status(201).json({
			message: 'Receta actualizada correctamente',
		});
	}
        
    } catch (error) {
        response.status(201).json({
			message: 'Error al actualizar',
		});
    }
	
    
});

module.exports = router;
