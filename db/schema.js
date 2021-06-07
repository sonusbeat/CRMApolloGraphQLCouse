const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    email: String
    created_at: String
  }

  type Query {
    getCourse: String
  }

  type Mutation {
    newUser: String
  }
`;

module.exports = typeDefs;
