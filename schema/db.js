const { default: joinMonster } = require('join-monster');
const knex = require('knex')({
	dialect: 'sqlite3',
	connection: {
		filename: require.resolve('lds-scriptures/lds-scriptures-sqlite3.db'),
	},
	useNullAsDefault: true,
});

module.exports = (...args) => joinMonster(args[3], {}, sql => knex.raw(sql));
