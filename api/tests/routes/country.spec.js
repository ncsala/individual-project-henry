/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const fetch = require('node-fetch');

const agent = session(app);
const recipe = {
	recipe_name: 'Pizza con mozzarella',
	dish_description: 'Un deliciosa pizza con salsa casera',
};

describe('Recipe routes', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	beforeEach(() =>
		Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
	);
	describe('GET /recipes', () => {
		it('Should get 200', async () => agent.get('/recipes').expect(200));
	});
	describe('GET /recipes?name=', () => {
		it('Should get 200', async () => agent.get('/recipes?=pizza').expect(200));

        it ('Should get 400', async () => agent.get('/recipes?=payaso').expect(400));

    //     it('should get 400', async function () {
    //         const response1 = await fetch('http://localhost:3001/recipes?name=payaso');
    //         expect(response1.status).to.eql(400);
    //     });

	// 	// Existen X recetas con la palabra rice en la api
	// 	it('It should return 200 if the recipe(s) exist', async function () {
	// 		const response = await fetch(
	// 			'http://localhost:3001/recipes?name=rice'
	// 		);
	// 		expect(response.status).to.eql(200);
	// 		// expect(response.body).to.have.length(3);
	// 		// const data = await response.json();
	// 		// expect(data.length).to.be.equal(3);
	// 	});
	// });

	// describe('GET /recipes/:id', () => {

	// 	// El numero 716426 es el id de la receta que existe en la api
	// 	it('should return a recipe by id', async () => {
	// 		const response2 = await fetch(
	// 			'http://localhost:3001/recipes/716426'
	// 		);
	// 		const recipes = await response2.json();
	// 		expect(response2.status).to.eql(200);
	// 		expect(recipes).to.have.length(1);
	// 	});

	// 	//No existe id asdfasdf '/recipes/:id'
	// 	it('should return 404 and object "{message: Ops, parece que la página ya no existe.}"', async () => {
	// 		const response3 = await fetch(
	// 			'http://localhost:3001/recipes/asdfasdf'
	// 		);
	// 		const msgError = await response3.json();
	// 		expect(response3.status).to.eql(404);
	// 		expect(msgError.message).to.eql(
	// 			'Ops, parece que la página ya no existe.'
	// 		);
	// 	});
	});
});
