const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    email: String
    created_at: String
  }

  type Token {
    token: String
  }

  type Product {
    id        : ID
    name      : String
    stock     : Int
    price     : Float
    created_at: String
  }

  input UserInput {
    first_name: String!
    last_name : String!
    email     : String!
    password  : String!
  }

  input AthenticateInput {
    email   : String!
    password: String!
  }

  type Query {
    # Users
    getUser(token: String!): User

    # Products
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  input ProductInput {
    name : String!
    stock: Int!
    price: Float!
  }

  type Mutation {

    # Users
    newUser(input: UserInput): User
    authenticateUser(input: AthenticateInput): Token 

    # Products
    newProduct(input: ProductInput): Product
    updateProduct( id: ID!, input: ProductInput ): Product
  }
`;

module.exports = typeDefs;
