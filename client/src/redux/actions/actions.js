export const GET_RECIPES = 'GET_RECIPES',
	GET_DIETS = 'GET_DIETS',
	GET_DETAIL = 'GET_DETAIL',
	FILTER_BY_DIET = 'FILTER_BY_DIET',
	ORDER = 'ORDER',
	SEARCH_BY_NAME = 'SEARCH_BY_NAME',
	CREATE_RECIPE = 'CREATE_RECIPE',
	SHOW_ERRORS = 'SHOW_ERRORS';

export const localHost = 'http://localhost:3001';

const serverNotAvailableError = {
        type: SHOW_ERRORS,
        payload: 'No se puede conectar a la base de datos',
    }

// Busca la data del Backend de las recetas y dispare un action con la data
export function getRecipes() {
	return async function (dispatch) {
		try {
			const response = await fetch(`${localHost}/recipes`);
            // allRecipes = array de recetas o mensajes de error desde el backend
			const allRecipes = await response.json();

			return dispatch({
				type: GET_RECIPES,
				payload: allRecipes,
			});
		} catch (error) {
			return dispatch(serverNotAvailableError);
		}
	};
}

export function getDiets() {
	return async function (dispatch) {
		try {
			const response = await fetch(`${localHost}/types`);
			const allDiets = await response.json();
			return dispatch({
				type: GET_DIETS,
				payload: allDiets,
			});
		} catch (error) {
			return dispatch(serverNotAvailableError);
		}
	};
}

export function getDetail(id) {
	return async function (dispatch) {
		try {
			const response = await fetch(`${localHost}/recipes/${id}`);
			const detail = await response.json();

			return dispatch({
				type: GET_DETAIL,
				payload: detail,
			});
		} catch (error) {
			return dispatch(serverNotAvailableError);
		}
	};
}

// Dispara acción para filtrar las recetas por dieta seleccionada por el usuario
export function filterByDiet(diet) {
	return {
		type: FILTER_BY_DIET,
		payload: diet,
	};
}

// Dispara acción para ordenar las recetas para ordenar
export function orderByScoreOrAlphabet(orderValue) {
	return {
		type: ORDER,
		payload: orderValue,
	};
}

// Dispara acción para buscar recetas por nombre
// Sino esta disponible receta, dispara error
export function searchRecipesByName(name) {
	// Del back regreso con:
	// Pueden ser las recetas, o con este objeto {message: 'La receta que buscas se perdió en algún momento'}
	return async function (dispatch) {
		try {
			if (name) {
				const response = await fetch(
					`${localHost}/recipes?name=${name}`
				);
				const recipes = await response.json();
				return dispatch({
					type: SEARCH_BY_NAME,
					payload: recipes,
				});
			}
		} catch (error) {
			return dispatch(serverNotAvailableError);
		}
	};
}

export function createRecipe(recipe) {
	return async function (dispatch) {
		try {
			await fetch(`${localHost}/recipe`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				// stringify convierte un objeto JS en un string en JSON
				body: JSON.stringify(recipe),
			});
			// const newRecipe = await response.json();
			return dispatch({
				type: CREATE_RECIPE,
				payload: 'La receta se ha creado con éxito',
			});
		} catch (error) {
			return dispatch(serverNotAvailableError);
		}
	};
}
