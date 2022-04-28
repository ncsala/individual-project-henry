const { Router } = require('express');

const { Recipe } = require('../db');

const router = Router();

router.delete('/:id', async (request, response) => {
try {
    const { id } = request.params;

	const recipe = await Recipe.findByPk(id);

	await recipe.destroy();

	if (recipe) {
		response.status(200).json({
			message: 'Receta eliminada correctamente',
		});
	}
} catch (error) {
    response.status(200).json({
        message: 'No se pudo eliminar la receta',
    });
}
});

module.exports = router;
