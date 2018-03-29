const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString,
} = require('graphql');

module.exports = {
	Volume: new GraphQLObjectType({
		name: 'Volume',
		description: '',
		fields: () => ({
			id: {
				type: new GraphQLNonNull(GraphQLInt),
				description: '',
			},
			name: {
				type: new GraphQLNonNull(GraphQLString),
				description: '',
			},
			title: {
				type: new GraphQLNonNull(GraphQLString),
				description: '',
			},
			longTitle: {
				type: GraphQLString,
				description: '',
			},
			subtitle: {
				type: GraphQLString,
				description: '',
			},
			shortTitle: {
				type: GraphQLString,
				description: '',
			},
		})
	}),
};
