const { ApolloServer, gql } = require("apollo-server");

// Create a new ApolloServer instance
const server = new ApolloServer();

// Run Server
server.listen().then( ({ url }) => {
    console.log(`Server running at URL: ${url}`);
});