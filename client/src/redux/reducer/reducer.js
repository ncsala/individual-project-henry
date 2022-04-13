import { GET_RECIPES, FILTER_BY_DIET } from '../actions/actions.js';

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
				recipe.diets?.map(diet => diet.toLowerCase()).includes(action.payload.toLowerCase())
			);
            
			// // Si no viene dieta trae todas las recetas
			if (action.payload === 'all')
				return { ...state, recipes: state.allRecipes };

			return {
				...state,
				recipes: filteredRecipes,
			};

		default:
			return { ...state };
	}
};

export default rootReducer;
