
const { Router } = require('express');


const postRecipe = require('./postRecipeRoute');
const getRecipesRoute = require('./getRecipesRoute');
const getTypesRoute = require('./getTypesRoute');
// const recipesIdRoute = require('./recipesIdRoute');

const router = Router();

// Se crean las rutas
// Ruta para traer todas las recetas
router.use('/recipes', getRecipesRoute);
// Ruta para detalle de dieta
router.use('/recipe', postRecipe)
// Ruta para los tipos de dieta
router.use('/types', getTypesRoute);

module.exports = router;
