import {
	GET_RECIPES,
	FILTER_BY_DIET,
	ORDER_BY_ALPHABET,
} from '../actions/actions.js';

const initialState = {
	recipes: [],
	allRecipes: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				allRecipes: action.payload,
			};

		case FILTER_BY_DIET:
			// Filtro las recetas que contengan la dieta ingresada por el usuario
			const filteredRecipes = state.allRecipes.filter((recipe) =>
				recipe.diets
					?.map((diet) => diet.toLowerCase())
					.includes(action.payload.toLowerCase())
			);
			// // Si no viene dieta trae todas las recetas
			if (action.payload === 'all')
				return { ...state, recipes: state.allRecipes };
			return {
				...state,
				recipes: filteredRecipes,
			};

		case ORDER_BY_ALPHABET:
			// Ordena las recetas por orden alfabético
			// const orderedRecipes = state.recipes.sort((a, b) => {
			//     if (action.payload === 'ascending') {
			//         return a.title.localeCompare(b.title);
			//     } else {
			//         return b.title.localeCompare(a.title);
			//     }
			// });
			// return {
			//     ...state,
			//     recipes: orderedRecipes,
			// };
			// let orderedRecipes = state.allRecipes;
			// console.log(orderedRecipes);

			let orderedRecipes = state.allRecipes;

			if (action.payload === 'ascending') {
				orderedRecipes = orderedRecipes.sort(function (a, b) {
					if (a.recipe_name > b.recipe_name) return 1;
					if (b.recipe_name > a.recipe_name) return -1;
					return 0;
				});
			}
			if (action.payload === 'descending') {
				orderedRecipes = orderedRecipes.sort(function (a, b) {
					if (a.recipe_name > b.recipe_name) return -1;
					if (b.recipe_name > a.recipe_name) return 1;
					return 0;
				});
			}

			console.log(orderedRecipes);

			return {
				...state,
				recipes: orderedRecipes,
			};

		default:
			return { ...state };
	}
};

export default rootReducer;
