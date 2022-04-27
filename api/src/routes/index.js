
const { Router } = require('express');


const postRecipe = require('./postRecipeRoute');
const getRecipesRoute = require('./getRecipesRoute');
const getTypesRoute = require('./getTypesRoute');

const router = Router();

// Se crean las rutas
// Ruta para traer todas las recetas
router.use('/recipes', getRecipesRoute);
// Ruta para detalle de dieta
router.use('/recipe', postRecipe)
// Ruta para los tipos de dieta
router.use('/types', getTypesRoute)

// Espera ser visitada cuando un error ocurra
router.use((error, request, response, next) => {
    return response.json({
        message: 'No se pudo obtener la información de la API ni de la Base de Datos. Error interno del servidor',
    })
})

module.exports = router;
