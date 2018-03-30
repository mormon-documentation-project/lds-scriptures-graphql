const { GraphQLServer } = require('graphql-yoga');

const schema = require('./schema');

const server = new GraphQLServer({schema});

const opts = {
	port: 8088,
};

server.start(opts, () => console.log(`Server running on port ${opts.port}`));
