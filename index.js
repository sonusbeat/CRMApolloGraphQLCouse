const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

// Create a new ApolloServer instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        const context = "Lorem ipsum dolor dolem";

        return {
            context
        };
    }
});

// Run Server
server.listen().then( ({ url }) => {
    console.log(`Server running at URL: ${url}`);
});