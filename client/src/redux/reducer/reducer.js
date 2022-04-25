import {
	GET_RECIPES,
	FILTER_BY_DIET,
	SEARCH_BY_NAME,
	ORDER_BY_ALPHABET,
	ORDER_BY_SCORE,
	CREATE_RECIPE,
	GET_DIETS,
	GET_DETAIL,
	SHOW_ERRORS,
} from '../actions/actions.js';

// Básicamente estoy tomando y renderizando el estado cuando cambia filteredRecipes
// allRecipes es como un auxiliar con todas las recetas para no perderlas
const initialState = {
	filteredRecipes: [],
	allRecipes: [], // Propiedad auxiliar
	recipeDetails: [],
	allDiets: [],
	msgError: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				allRecipes: action.payload,
				filteredRecipes: action.payload,
				msgError: [],
			};

		case GET_DETAIL:
			return {
				...state,
				recipeDetails: action.payload,
			};

		case GET_DIETS: {
			return {
				...state,
				allDiets: action.payload,
				msgError: [],
			};
		}

		case SEARCH_BY_NAME:
			// Si se recibe el mensaje 'La receta que...' se modifica el estado agregando ese mensaje al messageError
			if (
				action.payload.message ===
				'La receta que buscas se perdió en algún momento'
			) {
				return {
					...state,
					msgError: action.payload.message,
				};
			}

			// Si se manda un string vacío se modifica el estado eliminando el error y se renderizan todas las recetas
			if (action.payload === '') {
				return {
					...state,
					filteredRecipes: state.allRecipes,
					msgError: [],
				};
			}

			// En caso de que ninguna de las dos se cumplan, es porque encontró la receta con ese nombre,
			// por tanto también se elimina el error
			// Se modifica el estado agregando la/s receta/s encontrada/s
			return {
				...state,
				filteredRecipes: action.payload,
				msgError: [],
			};

		case FILTER_BY_DIET:
			// Filtro las recetas que contengan la dieta ingresada por el usuario
			const recipesByDiet = state.allRecipes?.filter((recipe) =>
				recipe.diets
					?.map((diet) => diet.toLowerCase())
					.includes(action.payload.toLowerCase())
			);

			// Si no viene dieta trae todas las recetas
			if (action.payload === 'all')
				return {
					...state,
					filteredRecipes: state.allRecipes,
					msgError: [],
				};

			if (!recipesByDiet.length) {
				return {
					...state,
					filteredRecipes: [],
					msgError: 'No se encontraron recetas con esa dieta',
				};
			}

			return {
				...state,
				filteredRecipes: recipesByDiet,
				msgError: [],
			};

		case ORDER_BY_ALPHABET:
			// Si viene un flag de orden ascendente o descendente
			// Ordeno alfabéticamente sobre las recetas que ya están filtradas
			const orderedRecipes = state.filteredRecipes?.sort((a, b) => {
				const recipeA = a.recipe_name?.toLowerCase();
				const recipeB = b.recipe_name?.toLowerCase();

				if (action.payload === 'ascending')
					return recipeA.localeCompare(recipeB);
				if (action.payload === 'descending')
					return recipeB.localeCompare(recipeA);

				return 0;
			});

			// Si no viene flag de orden ascendente o descendente devuelve el estado que tenia
			return { ...state, filteredRecipes: orderedRecipes };

		case ORDER_BY_SCORE:
            const orderedByScore = state.filteredRecipes?.sort((a, b) => {
                if (action.payload === '100a1')
                    return b.score - a.score
                if (action.payload === '1a100')
                    return a.score - b.score
			});
			return { ...state, filteredRecipes: orderedByScore };

		case CREATE_RECIPE:
			return {
				...state,
				msgError: [],
			};

		case SHOW_ERRORS:
			return {
				...state,
				allRecipes: [],
				filteredRecipes: [],
				allDiets: [],
				msgError: action.payload,
			};

		default:
			return state;
	}
};

export default rootReducer;
