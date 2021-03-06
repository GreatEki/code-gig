const Sequelize = require('sequelize');
const { PASSWORD, USERNAME, DB_NAME } = require('./keys');

const db = new Sequelize(DB_NAME, USERNAME, PASSWORD, {
	host: '127.0.0.1',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

module.exports = db;
