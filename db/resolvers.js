const User    = require("../models/User");
const Product = require("../models/Product");
const Client  = require("../models/Client");
const bcrypt  = require("bcryptjs");

require("dotenv").config({ path: "variables.env" });
const generateToken = require("../helpers/generateToken");
const jwt = require("jsonwebtoken");

// Resolvers
const resolvers = {

  Query: {

    getUser: async (_, { token }) => {
      return await jwt.verify( token, process.env.SECRET );
    },

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
    newClient: async (_, { input }) => {

      const { email } = input;

      // Check if the client has been already registered
      const client = await Client.findOne({ email });

      if (client) {
        throw new Error("The client cannot be created because it has already been registed!");
      }

      // Assing Seller
      // code ...

      try {

        // Create new Instance of Client Model
        const newClient = new Client(input);

        // Save to database
        // const result = await newClient.save();

        // Return Client Object
        // return result;

        return newClient;

      } catch (error) {

        console.log(error);

      }

    }

  }

};

module.exports = resolvers;