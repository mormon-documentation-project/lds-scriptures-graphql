const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = require('graphql');
const resolve = require('./db');
const {
	Volume,
	Book,
	Chapter,
	Verse,
} = require('./types');

module.exports = new GraphQLSchema({
	description: '',
	query: new GraphQLObjectType({
		name: 'Query',
		description: '',
		fields: () => ({
			volumes: {
				type: new GraphQLList(Volume),
				description: '',
				resolve,
			},
			volume: {
				type: Volume,
				description: '',
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLInt),
						description: '',
					},
				},
				where: (table, {id}) => `${table}.id = ${id}`,
				resolve,
			},
			books: {
				type: new GraphQLList(Book),
				description: '',
				args: {
					volumeId: {
						type: GraphQLInt,
						description: '',
					},
				},
				where: (table, {volumeId}) => typeof volumeId !== 'undefined' ? `${table}.volume_id = ${volumeId}` : false,
				resolve,
			},
			book: {
				type: Book,
				description: '',
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLInt),
						description: '',
					},
				},
				where: (table, {id}) => `${table}.id = ${id}`,
				resolve,
			},
			chapters: {
				type: new GraphQLList(Chapter),
				description: '',
				args: {
					bookId: {
						type: GraphQLInt,
						description: '',
					},
				},
				where: (table, {bookId}) => typeof bookId !== 'undefined' ? `${table}.book_id = ${bookId}` : false,
				resolve,
			},
			chapter: {
				type: Chapter,
				description: '',
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLInt),
						description: '',
					},
				},
				where: (table, {id}) => `${table}.id = ${id}`,
				resolve,
			},
			verses: {
				type: new GraphQLList(Verse),
				description: '',
				args: {
					chapterId: {
						type: GraphQLInt,
						description: '',
					},
				},
				where: (table, {chapterId}) => typeof chapterId !== 'undefined' ? `${table}.chapter_id = ${chapterId}` : false,
				resolve,
			},
			verse: {
				type: Verse,
				description: '',
				args: {
					id: {
						type: new GraphQLNonNull(GraphQLInt),
						description: '',
					},
				},
				where: (table, {id}) => `${table}.verse_id = ${id}`,
				resolve,
			},
		}),
	}),
});
