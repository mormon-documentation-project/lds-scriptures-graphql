const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');

const app = express();

app.use('/', graphqlHTTP({
	schema,
	graphiql: !process.env.DISABLE_GRAPHIQL,
}));

app.listen(8088);
