const {
	GraphQLInt,
	GraphQLString,
} = require('graphql');
const { Volume } = require('./types');
const db = require('./db');

module.exports = {
	type: Volume,
	args: {
		id: {type: GraphQLInt},
		name: {type: GraphQLString},
	},
	resolve(rootValue, {id, name}) {
		let key, val;

		if (typeof id !== 'undefined') {
			key = 'id';
			val = id;
		} else if (typeof name !== undefined) {
			key = 'volume_lds_url';
			val = name;
		} else {
			throw new Error('id or name required');
		}

		return db.prepare(`
			SELECT
				id,
				volume_title AS title,
				volume_long_title AS longTitle,
				volume_subtitle AS subtitle,
				volume_short_title AS shortTitle,
				volume_lds_url AS name
			FROM volumes
			WHERE ${key} = ?
		`).get(val);
	},
};
