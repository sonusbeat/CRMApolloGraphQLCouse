const User    = require("../models/User");
const Product = require("../models/Product");
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

  }

};

module.exports = resolvers;