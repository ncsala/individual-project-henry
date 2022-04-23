const { Router } = require('express');
const { Recipe, Type_of_diet } = require('../db');

const router = Router();

//  GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get('/:id', async (request, response) => {
    // try {
    //     // Desestructuro la request que viene por query
    //     const { id } = request.params;
    //     const recipe = await Recipe.findByPk(id, {
    //         include: {
    //             model: Type_of_diet,
    //             attributes: ['type_of_diet_name'],
    //             through: {
    //                 attributes: [],
    //             },
    //         },
    //     });
    //     if (!recipe) {
    //         return response.status(404).json({
    //             message: 'No se encontró la receta',
    //         });
    //     }
    //     response.json(recipe);
    // } catch (error) {
    //     console.error(error);
    //     return response.status(500).json({
    //         message: 'Error al obtener la receta',
    //     });
    // }

	try {
		// Se desestructura el id de params de la request
		const { id } = request.params;
		// Se trae la data de la API y la BD
		const recipes = await getBdAndApiRecipes();
		if (id) {
			// Se filtra la receta que coincida con el id de la request
			const filteredRecipe = recipes.filter(
				(recipe) => recipe.recipe_id === parseInt(id)
			);
			// Si no existe ninguna receta con ese id mostrar un mensaje adecuado
			if (!filteredRecipe.length) {
				response.status(404).json({
					message: 'La receta que buscas se perdió en algún momento',
				});
			}
			// Si existe alguna receta mostrarla
			if (filteredRecipe.length) response.json(filteredRecipe);
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


// export default function fetchCityById(id, setCities) {
    //   fetch(
//     `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}&units=metric`
//   )
//     .then((r) => r.json())
//     .then((recurso) => {
//       if (recurso.main !== undefined) {
//         const city = {
//           min: Math.round(recurso.main.temp_min),
//           max: Math.round(recurso.main.temp_max),
//           img: recurso.weather[0].icon, 
//           id: recurso.id,
//           temp: recurso.main.temp,
//           name: recurso.name,
//         };
//         setCities(city);
//       } else {
//         setCities(null);
//       }
//     });
// }

module.exports = router;