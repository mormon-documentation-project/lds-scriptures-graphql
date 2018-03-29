const { GraphQLList, GraphQLObjectType } = require('graphql');
const { Volume } = require('./types');
const db = require('./db');

module.exports = {
	type: GraphQLList(Volume),
	resolve() {
		return db.prepare(`
			SELECT
				id,
				volume_title AS title,
				volume_long_title AS longTitle,
				volume_subtitle AS subtitle,
				volume_short_title AS shortTitle,
				volume_lds_url AS name
			FROM volumes
		`).all();
	}
}
