const {
	GraphQLSchema,
	GraphQLObjectType,
} = require('graphql');

const volume = require('./volume');
const volumes = require('./volumes');

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			volume,
			volumes,
		},
	}),
});
