const { gql } = require('apollo-server');

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

module.exports = typeDefs;