const User    = require("../models/User");
const Product = require("../models/Product");
const Client  = require("../models/Client");
const Order   = require("../models/Order");
const bcrypt  = require("bcryptjs");

require("dotenv").config({ path: "variables.env" });
const generateToken = require("../helpers/generateToken");
const jwt = require("jsonwebtoken");

// Resolvers
const resolvers = {

  Query: {

    // User
    getUser: async (_, { token }) => {
      return await jwt.verify( token, process.env.SECRET );
    },

    // Products
    getProducts: async () => {

      try {

        return await Product.find({});

      } catch (error) {

        console.log( error );

      }

    },

    getProduct: async (_, { id }) => {
      // Check if product exists
      const product = await Product.findById(id);

      // Validation
      if (!product) {
        throw new Error("Product not founded!");
      }

      // If product exists, return Product Object
      return product;
    },

    // Clients
    getClients: async () => {

      try {

        return await Client.find({});

      } catch( error ) {

        console.log( error );

      }

    },

    getSellerClients: async ( _, {}, context ) => {

      const { id } = context.user;

      try {

        return await Client.find({ seller: id.toString() });

      } catch( error ) {

        console.log( error );

      }
    },

    getClient: async ( _, { id }, context ) => {
      // Check if client exists
      const client = await Client.findById(id);

      // Check if client exists in database
      if (!client) {
        throw new Error("Client not founded!");
      }

      // Check if client seller is the same user who created
      if(client.seller.toString() !== context.user.id) {
        throw new Error("Access Denied!");
      }

      // Return Client Object
      return client;
    },

    // Orders
    getOrders: async () => {
      try {

        return await Order.find({});

      } catch (error) {

        console.log( error );

      }
    }
  },

  Mutation: {

    // Users
    newUser: async (_, { input } ) => {
      // Check if user is not register
      const { email, password } = input;
      const userExists = await User.findOne({ email });
      
      if (userExists) {
        throw new Error(`User with email "${ email }" already exists!`);
      }
      
      // Generate Salt
      const salt = await bcrypt.genSalt(10);

      // Hash Password
      input.password = await bcrypt.hash(password, salt);

      try {

        // Create new Instance of User Model
        const user = new User(input);

        // Save to database
        user.save();

        // Return the new user object
        return user;

      } catch( error ) {

        console.log(error);

      }

    },

    authenticateUser: async (_, { input }) => {

      // Destructuring email and password from input object
      const { email, password } = input;

      // Find user by email
      const userExists = await User.findOne({ email });

      // Check if user exists
      if (!userExists) {
        throw new Error(`User with email "${ email }" does not exist !`);
      }

      // Check if password is correct
      const passwordCorrect = await bcrypt.compare( password, userExists.password );

      // Throw error if password does not match
      if (!passwordCorrect) {
        throw new Error("Password Invalid !");
      }

      // Create Token
      return {
        token: generateToken(userExists, process.env.SECRET)
      };

    },

    // Products
    newProduct: async (_, { input }) => {
      try {

        // Create new Instance of Product Model
        const product = new Product( input );

        // Save to database
        const result = await product.save();

        // Return Product Object
        return result;

      } catch ( error ) {

        console.log(error);

      }
    },

    updateProduct: async (_, { id, input }) => {

      // Check if product exists
      let product = Product.findById(id);

      // Validation
      if (!product) {
        throw new Error("Product not founded!");
      }

      // Update product
      // Note: { new: true } returns updated object
      product = Product.findOneAndUpdate({ _id: id }, input, { new: true });

      // If product is updated, return Product Object
      return product;
    },

    deleteProduct: async (_, { id }) => {

      // Check if product exists
      const product = await Product.findById(id);

      // Validation
      if (!product) {
        throw new Error("Product not founded!");
      }

      try {

        // Delete product
        await Product.findOneAndDelete({ _id: id });

        // Return String Message
        return "Product Deleted!";

      } catch (error) {

        console.log(error);

      }

    },

    // Clients
    newClient: async ( _, { input }, context ) => {

      // Deconstruct id from context.user object
      const { user } = context;

      // Deconstruct id from input object
      const { email } = input;

      // Check if the client has been already registered
      const client = await Client.findOne({ email });

      // Validation
      if (client) {
        throw new Error("The client cannot be created because it has already been registed!");
      }
     
      try {

        // Create new Instance of Client Model
        const newClient = new Client(input);

        // Assing Seller
        newClient.seller = user.id;

        // Save to database
        const result = await newClient.save();

        // Return Client Object
        return result;

      } catch (error) {

        console.log(error);

      }

    },

    updateClient: async ( _, { id, input }, context ) => {

      // Check if client exists
      let client = await Client.findById(id);

      // Check if client exists
      if(!client) {
        throw new Error("Client not founded!");
      }

      // Check if user can update the client
      if(client.seller.toString() !== context.user.id) {
        throw new Error("You're not authorized to update this client!");
      }

      // Update client
      // Note: { new: true } returns updated object
      client = await Client.findOneAndUpdate({ _id: id }, input, { new: true });

      // Return updated Client Object
      return client;
    },

    deleteClient: async ( _, { id }, context ) => {

      // Check if product exists
      const client = await Client.findById(id);

      // Check if client exists
      if (!client) {
        throw new Error("Client not founded!");
      }

      // Check if user can delete the client
      if(client.seller.toString() !== context.user.id) {
        throw new Error("You're not authorized to delete this client!");
      }

      try {

        // Delete client
        await Client.findOneAndDelete({ _id: id });

        // Return String Message
        return "Client Deleted!";

      } catch (error) {

        console.log(error);

      }

    },

    // Orders
    newOrder: async ( _, { input }, context ) => {

      const { order, total, client: clientId, status } = input;

      // Check if client exists
      const client = await Client.findById(clientId);

      if(!client) {
        throw new Error("Client does not exist !");
      }

      // Check if client belongs to seller
      if (client.seller.toString() !== context.user.id ) {
        throw new Error("You're not authorized to sell to this client!");
      }

      // Check if stock is available
      for await ( const item of order ) {
        const product = await Product.findById(item.id);

        if (product.stock === 0) {
          throw new Error(`There's no more available stock for the product: "${product.name}"!`);
        } else if (item.quantity > product.stock) {
          throw new Error(`The product: "${product.name}" exceeds the available stock!`);
        } else {
          // Update product stock
          product.stock = product.stock - item.quantity;
          await product.save();
        }
      }
      
      // Create new Instance of Order Model
      const newOrder = new Order( input );

      // Assing seller
      newOrder.seller = context.user.id;

      // Save to database
      const result = await newOrder.save();

      // Return Order Object
      return result;
    },   

  }

};

module.exports = resolvers;