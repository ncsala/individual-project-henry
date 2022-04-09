const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo
// Luego le injectamos la conexión a sequelize.

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('recipe', {
		// ID: *
		recipe_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		// Nombre *
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// Resumen del plato *
		dish_description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// Puntuación
		score: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		// Nivel de "comida saludable"
		healthy_food_level: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		// Paso a paso
		step_by_step: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		// Recipientes creados en la base de datos
		created_in_db: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	});
};
