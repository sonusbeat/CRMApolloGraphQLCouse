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

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: ID
    seller: ID
    created_at: String
    status: OrderStatus
  }

  type OrderGroup {
    id: ID
    quantity: Int
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
    getSellerClients: [Client]
    getClient(id: ID!): Client

    # Orders
    getOrders: [Order]
    getSellerOrders: [Order]
    getOrder(id: ID!): Order
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

  input OrderProductInput {
    id: ID
    quantity: Int
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    status: OrderStatus
  }

  enum OrderStatus {
    PENDING
    COMPLETED
    CANCELED
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
    updateClient( id: ID!, input: ClientInput ): Client
    deleteClient( id: ID!): String

    # Orders
    newOrder(input: OrderInput): Order
    updateOrder( id: ID!, input: OrderInput ): Order
    deleteOrder( id: ID! ): String
  }
`;

module.exports = typeDefs;
