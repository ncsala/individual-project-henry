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
			const recipesByDiet = state.allRecipes?.filter((recipe) =>
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
			// Si viene un flag de orden ascendente o descendente
			// Ordeno alfabéticamente sobre las recetas que ya están filtradas
			const orderedRecipes = state.filteredRecipes?.sort((a, b) => {
				const recipeA = a.recipe_name?.toLowerCase();
				const recipeB = b.recipe_name?.toLowerCase();

                // localeCompare es una función de javascript que compara dos strings y devuelve un número 0,-1 o 1 dependiendo de si son iguales, menor o mayor
				if (action.payload === 'ascending')
					return recipeA.localeCompare(recipeB);
				if (action.payload === 'descending')
					return recipeB.localeCompare(recipeA);
			});

			// Si no viene flag de orden ascendente o descendente devuelve el estado que tenia
			return { ...state, filteredRecipes: orderedRecipes };

		default:
			return state;
	}
};

export default rootReducer;
