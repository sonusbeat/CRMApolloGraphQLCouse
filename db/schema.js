const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id        : ID
    first_name: String
    last_name : String
    email     : String
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

  type Client {
    id        : ID
    first_name: String
    last_name : String
    email     : String
    company   : String
    phone     : String
    created_at: String
    seller    : ID
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

    # Clients
    getClients: [Client]
  }

  input ProductInput {
    name : String!
    stock: Int!
    price: Float!
  }

  input ClientInput {
    first_name: String!
    last_name : String!
    email     : String!
    company   : String!
    phone     : String
  }

  type Mutation {

    # Users
    newUser(input: UserInput): User
    authenticateUser(input: AthenticateInput): Token 

    # Products
    newProduct(input: ProductInput): Product
    updateProduct( id: ID!, input: ProductInput ): Product
    deleteProduct( id: ID! ): String

    # Clients
    newClient(input: ClientInput): Client
  }
`;

module.exports = typeDefs;
