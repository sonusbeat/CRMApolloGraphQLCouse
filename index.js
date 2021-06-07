const { ApolloServer, gql } = require('apollo-server');

// Schema
const typeDefs = gql`

    type Course {
        title: String        
    }

    type Technology {
        technology: String
    }

    type Query {
        getCourses : [Course]
        getTechnologies : [Technology]
    }

`;

const courses = [
    {
        title: 'JavaScript Definitive Modem Guide, Build +10 Projects',
        technology: 'JavaScript ES6',
    },
    {
        title: 'React – The Complete Guide: Hooks Context Redux MERN +15 Apps',
        technology: 'React',
    },
    {
        title: 'Node.js – Bootcamp Development Web, inc MVC and REST API’s',
        technology: 'Node.js'
    }, 
    {
        title: 'ReactJS Advanced – FullStack React GraphQL and Apollo',
        technology: 'React'
    }
];

// Resolvers
const resolvers = {
    Query: {
        getCourses: () => courses,
        getTechnologies: () => courses,
    }
};

// Create a new ApolloServer instance
const server = new ApolloServer({
    typeDefs,
    resolvers
});


// Run Server
server.listen().then( ({ url }) => {
    console.log(`Server running at URL: ${url}`);
});