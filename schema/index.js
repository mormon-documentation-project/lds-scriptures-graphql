const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');
const {scriptures, strongs} = require('./db');
const {
	Volume,
	Book,
	Chapter,
	Verse,
	Strongs,
} = require('./types');

const StrongsLang = new GraphQLEnumType({
	name: 'StrongsLang',
	values: {
		H: { value: 'H'},
		HEB: { value: 'H' },
		HEBREW: { value: 'H' },
		G: { value: 'G' },
		GR: { value: 'G' },
		GREEK: { value: 'G' },
	},
});
const strongsArgs = {
    id: {
        type: GraphQLString,
            description: '',
    },
    lang: {
        type: StrongsLang,
            description: '',
    },
};

function strongsWhere(table, {id, lang}) {
    lang = lang && lang[0].toUpperCase();

    if (id && lang && !isNaN(id)) {
        id = `${lang}${id}`;
    } else if (lang && !id) {
        return `${table}.number LIKE '${lang}%'`;
    } else if (!lang && !id) {
        throw new Error('id and/or lang required');
    }

    return `${table}.number = '${id}'`;
};

module.exports = new GraphQLSchema({
	description: '',
	query: new GraphQLObjectType({
		name: 'Query',
		description: '',
		fields: () => ({
			volumes: {
				type: new GraphQLList(Volume),
				description: '',
				resolve: scriptures,
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
				resolve: scriptures,
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
				resolve: scriptures,
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
				resolve: scriptures,
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
				resolve: scriptures,
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
				resolve: scriptures,
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
				resolve: scriptures,
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
				resolve: scriptures,
			},
			strongsEntry: {
				type: Strongs,
				description: '',
				args: {
                    id: {
                        type: GraphQLString,
                        description: '',
                    },
					lang: {
						type: StrongsLang,
						description: '',
					},
					number: {
						type: GraphQLInt,
						description: '',
					},
				},
				where: (table, {lang, number, id}) => {
                    if (!id && (lang && number)) {
                    	id = `${lang}${number}`;
					} else if (!id) {
                        throw new Error('lang and number are both required if no id is given');
					}

					return `${table}.number = '${id}'`;
				},
				resolve: strongs,
			},
			strongsEntries: {
				type: new GraphQLList(Strongs),
				description: '',
				args: {
					lang: {
						type: new GraphQLNonNull(StrongsLang),
						description: '',
					},
				},
				where: (table, {lang}) => `${table}.number LIKE '${lang}%'` ,
				resolve: strongs,
			},
		}),
	}),
});
