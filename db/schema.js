const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    email: String
    created_at: String
  }

  input UserInput {
    first_name: String!
    last_name : String!
    email     : String!
    password  : String!
  }

  type Query {
    getCourse: String
  }

  type Mutation {
    newUser(input: UserInput): User
  }
`;

module.exports = typeDefs;
