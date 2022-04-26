const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('type_of_diet', {
		// type_of_diet_id: {
		// 	type: DataTypes.UUID,
		// 	defaultValue: DataTypes.UUIDV4,
		// 	primaryKey: true,
		// 	allowNull: false,
		// },
		// Nombre *
		type_of_diet_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};

