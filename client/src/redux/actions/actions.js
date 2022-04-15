export const GET_RECIPES = 'GET_RECIPES',
	FILTER_BY_DIET = 'FILTER_BY_DIET',
    ORDER_BY_ALPHABET = 'ORDER_BY_ALPHABET'
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
	return {
		type: FILTER_BY_DIET,
		payload: diet,
	};
}

// Dispara acción para ordenar las recetas por orden alfabético
export function orderAlphabetically(ascendingOrDescending) {
    return {
        type: ORDER_BY_ALPHABET,
        payload: ascendingOrDescending,
    }
}

export function searchRecipesByName(name) {
    return async function (dispatch) {
        const response = await fetch(`${localHost}/recipes/search/${name}`);
        const recipes = await response.json();

        return dispatch({
            type: GET_RECIPES,
            payload: recipes,
        });
    }
}