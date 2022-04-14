import {
	GET_RECIPES,
	FILTER_BY_DIET,
	ORDER_BY_ALPHABET,
} from '../actions/actions.js';

// Básicamente estoy tomando y renderizando el estado cuando cambia filteredRecipes
// allRecipes es como un auxiliar con todas las recetas para no perderlas
const initialState = {
	filteredRecipes: [],
	allRecipes: [], // Propiedad auxiliar 
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECIPES:
            // Seteo las dos propiedades con todas las recetas
			return {
				...state,
				filteredRecipes: action.payload,
				allRecipes: action.payload,
			};

		case FILTER_BY_DIET:
			// Filtro las recetas que contengan la dieta ingresada por el usuario
			const recipesByDiet = state.allRecipes.filter((recipe) =>
				recipe.diets
					?.map((diet) => diet.toLowerCase())
					.includes(action.payload.toLowerCase())
			);
			// // Si no viene dieta trae todas las recetas
			if (action.payload === 'all')
				return { ...state, filteredRecipes: state.allRecipes };
			return {
				...state,
				filteredRecipes: recipesByDiet,
			};

		case ORDER_BY_ALPHABET:
            // Ordeno alfabéticamente sobre las recetas que ya están filtradas
            const orderedRecipes = state.filteredRecipes.sort((a, b) => {
                if (action.payload === 'ascending') {
                    return a.recipe_name.localeCompare(b.recipe_name);
                } else {
                    return b.recipe_name.localeCompare(a.recipe_name);
                }
            });
            return {
                ...state,
                filteredRecipes: orderedRecipes,
            };

			// let orderedRecipes = state.filteredRecipes;

			// if (action.payload === 'ascending') {
			// 	orderedRecipes = orderedRecipes.sort(function (a, b) {
			// 		if (a.recipe_name > b.recipe_name) return 1;
			// 		if (b.recipe_name > a.recipe_name) return -1;
			// 		return 0;
			// 	});
			// }
			// if (action.payload === 'descending') {
			// 	orderedRecipes = orderedRecipes.sort(function (a, b) {
			// 		if (a.recipe_name > b.recipe_name) return -1;
			// 		if (b.recipe_name > a.recipe_name) return 1;
			// 		return 0;
			// 	});
			// }

			// return {
			// 	...state,
			// 	filteredRecipes: orderedRecipes,
			// };

		default:
			return { ...state };
	}
};

export default rootReducer;
