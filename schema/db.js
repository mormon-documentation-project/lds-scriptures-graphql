const { default: joinMonster } = require('join-monster');

const scriptures = require('knex')({
	dialect: 'sqlite3',
	connection: {
		filename: require.resolve('lds-scriptures/lds-scriptures-sqlite3.db'),
	},
	useNullAsDefault: true,
});

const strongs = require('knex')({
	dialect: 'sqlite3',
	connection: {
		filename: require.resolve('strongs/strongs-sqlite3.db'),
	},
	useNullAsDefault: true,
});

module.exports = {
	scriptures: (...args) => joinMonster(args[3], {}, sql => scriptures.raw(sql)),
	strongs: (...args) => joinMonster(args[3], {}, sql => strongs.raw(sql)),
};