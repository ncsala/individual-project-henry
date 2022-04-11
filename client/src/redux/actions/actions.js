export const GET_RECIPES = 'GET_RECIPES';
export const localHost = 'http://localhost:3001';

export function getRecipes() {
	return async function (dispatch) {
		const response = await fetch(`${localHost}/recipes`);
		const data = await response.json();

		return dispatch({
			type: GET_RECIPES,
			payload: data,
		});
	};
}
