const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const connectDB = require("./config/db");

// Connect to database
connectDB();

// Create a new ApolloServer instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {

        const token = req.headers['authorization'] || "";

        if (token) {
            try {

                const user = jwt.verify(token, process.env.SECRET);

                return {
                    user
                };

            } catch (error) {
                console.log("There was an error!");
                console.log(error);
            }
        }
    }
});

// Run Server
server.listen().then( ({ url }) => {
    console.log(`Server running at URL: ${url}`);
});