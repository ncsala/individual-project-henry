export const GET_RECIPES = 'GET_RECIPES',
	FILTER_BY_DIET = 'FILTER_BY_DIET',
	ORDER_BY_ALPHABET = 'ORDER_BY_ALPHABET',
	SEARCH_BY_NAME = 'SEARCH_BY_NAME',
	CREATE_RECIPE = 'CREATE_RECIPE',
	GET_DIETS = 'GET_DIETS';

export const localHost = 'http://localhost:3001';

// Busca la data del Backend de las recetas y dispare un action con la data
export function getRecipes() {
	return async function (dispatch) {
		// Con fetch
		fetch(`${localHost}/recipes`)
			.then((response) => response.json())
			.then((allRecipes) => {
				return dispatch({
					type: GET_RECIPES,
					payload: allRecipes,
				});
			})
			.catch((error) => {
				console.log(error);
				return dispatch({
					type: GET_RECIPES,
					payload: 'No se puede conectar a la base de datos',
				});
			});

		// Con async await
		// const response = await fetch(`${localHost}/recipes`);
		// const recipes = await response.json();

		// return dispatch({
		// 	type: GET_RECIPES,
		// 	payload: recipes,
		// });
	};
}

// Dispara acción para filtrar las recetas por dieta seleccionada por el usuario
export function filterByDiet(diet) {
	// lo que puedo hacer si no hay recetas con ese tipo de dieta es recibir un mensaje del back
	// arrojando un msj 'No hay recetas con ese tipo de dieta'
	try {
		return {
			type: FILTER_BY_DIET,
			payload: diet,
		};
	} catch (error) {
		console.log(error);
	}
}

// Dispara acción para ordenar las recetas por orden alfabético
export function orderAlphabetically(ascendingOrDescending) {
	try {
		return {
			type: ORDER_BY_ALPHABET,
			payload: ascendingOrDescending,
		};
	} catch (error) {
		console.log(error);
	}
}

// Dispara acción para buscar recetas por nombre
// Sino esta disponible receta, dispara error
export function searchRecipesByName(name) {
	// Del back regreso con:
	// Pueden ser las recetas, o con este objeto {message: 'La receta que buscas se perdió en algún momento'}

	return async function (dispatch) {
		try {
			const response = await fetch(`${localHost}/recipes?name=${name}`);
			const recipes = await response.json();
			return dispatch({
				type: SEARCH_BY_NAME,
				payload: recipes,
			});
		} catch (error) {
			// Por si no esta levantado el backend
			return dispatch({
				type: GET_RECIPES,
				payload: 'No se puede conectar a la base de datos',
			});
		}
	};

	// Con Async await
	// return async function (dispatch) {
	// 	const response = await fetch(`${localHost}/recipes?name=${name}`).catch(
	// 		() => undefined
	// 	);

	// 	if (response) {
	// 		const recipes = await response.json();
	// 		console.log(recipes);

	// 		return dispatch({
	// 			type: SEARCH_BY_NAME,
	// 			payload: recipes,
	// 		});
	// 	}

	// 	return dispatch({
	// 		type: SEARCH_BY_NAME,
	// 		payload: 'No se puede conectar a la base de datos',
	// 	});
	// };
}

export function createRecipe(recipe) {
	return async function (dispatch) {
		try {
			const response = await fetch(`${localHost}/recipe`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
                // stringify convierte un objeto JS en un string en JSON
				body: JSON.stringify(recipe),
			});
			const newRecipe = await response.json();
            return newRecipe;
		} catch (error) {
			return dispatch({
				type: CREATE_RECIPE,
				payload: 'No se puede conectar a la base de datos',
			});
		}
	};
}

export function getDiets() {
	return async function (dispatch) {
		fetch(`${localHost}/types`)
			.then((response) => response.json())
			.then((allDiets) => {
				return dispatch({
					type: GET_DIETS,
					payload: allDiets,
				});
			})
			.catch((error) => {
				return dispatch({
					type: GET_DIETS,
					payload: 'No se puede conectar a la base de datos',
				});
			});
	};
}
