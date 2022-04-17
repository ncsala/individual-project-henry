import {
	GET_RECIPES,
	FILTER_BY_DIET,
	ORDER_BY_ALPHABET,
	SEARCH_BY_NAME,
	POST_RECIPE,
} from '../actions/actions.js';

// Básicamente estoy tomando y renderizando el estado cuando cambia filteredRecipes
// allRecipes es como un auxiliar con todas las recetas para no perderlas
const initialState = {
	filteredRecipes: [],
	allRecipes: [], // Propiedad auxiliar
	msgError: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECIPES:
			if (action.payload === 'No se puede conectar a la base de datos') {
				return {
					...state,
					allRecipes: [],
					filteredRecipes: [],
					msgError: action.payload,
				};
			}

			return {
				...state,
				allRecipes: action.payload,
				filteredRecipes: action.payload,
			};

		case SEARCH_BY_NAME:
			// Si viene un nombre de receta
			// Busco las recetas que coincidan con el nombre ingresado por el usuario
			if (action.payload.message === 'La receta que buscas se perdió en algún momento') {
				return {
					...state,
					filteredRecipes: action.state.allRecipes,
					msgError: action.payload.message,
				};
			}

            if (action.payload === '') {
                return {
                    ...state,
                    filteredRecipes: state.allRecipes,
                };
            }
            // if (action.payload.message === 'No se puede conectar a la base de datos') {
            // }
			return {
				...state,
				filteredRecipes: action.payload,
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

		case POST_RECIPE:
			return {
				...state,
				allRecipes: [...state.allRecipes, action.payload],
			};

		default:
			return state;
	}
};

export default rootReducer;
