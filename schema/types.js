const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
} = require('graphql');

const Volume = new GraphQLObjectType({
	name: 'Volume',
	description: '',
	sqlTable: 'volumes',
	uniqueKey: 'id',
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: '',
		},
		name: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'volume_lds_url',
		},
		title: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'volume_title',
		},
		longTitle: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'volume_long_title',
		},
		subtitle: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'volume_subtitle',
		},
		abbr: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'volume_short_title',
		},
		books: {
			type: GraphQLList(Book),
			description: '',
			sqlJoin: (volumesTable, booksTable) => `${volumesTable}.id = ${booksTable}.volume_id`,
			orderBy: 'id',
		},
	}),
});

const Book = new GraphQLObjectType({
	name: 'Book',
	description: '',
	sqlTable: 'books',
	uniqueKey: 'id',
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: '',
		},
		name: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'book_lds_url',
		},
		title: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'book_title',
		},
		longTitle: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'book_long_title',
		},
		subtitle: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'book_subtitle',
		},
		abbr: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'book_short_title',
		},
		volume: {
			type: Volume,
			description: '',
			sqlJoin: (booksTable, volumesTable) => `${booksTable}.volume_id = ${volumesTable}.id`,
		},
	}),
});

const Chapter = new GraphQLObjectType({
	name: 'Chapter',
	description: '',
	sqlTable: 'chapters',
	uniqueKey: 'id',
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: '',
		},
		number: {
			type: GraphQLInt,
			description: '',
			sqlColumn: 'chapter_number',
		},
		book: {
			type: Book,
			description: '',
			sqlJoin: (chaptersTable, booksTable) => `${chaptersTable}.book_id = ${booksTable}.id`,
		},
		verses: {
			type: GraphQLList(Verse),
			description: '',
			sqlJoin: (chaptersTable, versesTable) => `${chaptersTable}.id = ${versesTable}.chapter_id`,
		},
	}),
});

const Verse = new GraphQLObjectType({
	name: 'Verse',
	description: '',
	sqlTable: 'scriptures',
	uniqueKey: 'verse_id',
	fields: () => ({
		id: {
			type: GraphQLInt,
			description: '',
			sqlColumn: 'verse_id',
		},
		number: {
			type: GraphQLInt,
			description: '',
			sqlColumn: 'verse_number',
		},
		chapterNumber: {
			type: GraphQLInt,
			description: '',
			sqlColumn: 'chapter_number',
		},
		text: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'scripture_text',
		},
		reference: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'verse_title',
		},
		ref: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'verse_short_title',
		},
		chapter: {
			type: Chapter,
			description: '',
			sqlJoin: (scripturesTable, chaptersTable) => `${scripturesTable}.chapter_id = ${chaptersTable}.id`,
		},
		book: {
			type: Book,
			description: '',
			sqlJoin: (scripturesTable, booksTable) => `${scripturesTable}.book_id = ${booksTable}.id`,
		},
		volume: {
			type: Book,
			description: '',
			sqlJoin: (scripturesTable, volumesTable) => `${scripturesTable}.volume_id = ${volumesTable}.id`,
		},
	}),
});

const Strongs = new GraphQLObjectType({
	name: 'Strongs',
	description: '',
	sqlTable: 'strongs',
	uniqueKey: 'number',
	fields: () => ({
		id: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'number',
		},
		lang: {
			type: GraphQLString,
			description: '',
            sqlDeps: ['number'],
			resolve({number}) {
				switch (number[0]) {
					case 'G':
						return 'Greek';
						break;
					case 'H':
						return 'Hebrew';
						break;
					default:
						return 'unknown';
						break;
				}
            }
		},
		entry: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'lemma',
		},
		transliteration: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'xlit',
		},
		pronunciation: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'pronounce',
		},
		definition: {
			type: GraphQLString,
			description: '',
			sqlColumn: 'description',
		},
	}),
});

module.exports = {
	Volume,
	Book,
	Chapter,
	Verse,
	Strongs,
};
