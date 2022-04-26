import {
	GET_RECIPES,
	FILTER_BY_DIET,
	SEARCH_BY_NAME,
	ORDER,
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
            //Aca se reciben las recetas desde la accion, las q cumplen con el nombre

			// Si se recibe el mensaje 'La receta que...' se modifica el estado agregando ese mensaje al messageError
			if (
				action.payload.message ===
				'La receta que buscas se perdió en algún momento'
			) {
				return {
					...state,
                    filteredRecipes: [],
					msgError: action.payload.message,
				};
			}

			// Sino no se cumple la condicion anterior significa que encontro la receta
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

		case ORDER:
			const resultingOrder = state.filteredRecipes?.sort((a, b) => {
				if (action.payload === 'ascending') {
					return a.recipe_name
						?.toLowerCase()
						.localeCompare(b.recipe_name);
				}
				if (action.payload === 'descending') {
					return b.recipe_name.localeCompare(
						a.recipe_name?.toLowerCase()
					);
				}
				if (action.payload === '100a1') return b.score - a.score;
				if (action.payload === '1a100') return a.score - b.score;
				return 0;
			});
			return { ...state, filteredRecipes: resultingOrder };

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
