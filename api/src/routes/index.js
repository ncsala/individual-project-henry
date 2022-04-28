const { Router } = require('express');

const postRecipe = require('./postRecipeRoute');
const getRecipesRoute = require('./getRecipesRoute');
const getTypesRoute = require('./getTypesRoute');
const putRecipes = require('./putRecipes');
const deleteRecipesRoute = require('./deleteRecipesRoute');

const router = Router();

// Se crean las rutas
// Ruta para traer todas las recetas
router.use('/recipes', getRecipesRoute);
// Ruta para detalle de dieta
router.use('/recipe', postRecipe);
// Ruta para los tipos de dieta
router.use('/types', getTypesRoute);
// Ruta para hacer los update de las recetas
router.use('/update', putRecipes);
// Ruta para delete de las recetas
router.use('/delete', deleteRecipesRoute);

// Espera ser visitada cuando un error ocurra
// router.use((error, request, response, next) => {
// 	return response.json({
// 		message:
// 			'No se pudo obtener la información de la API ni de la Base de Datos. Error interno del servidor',
// 	});
// });

module.exports = router;
