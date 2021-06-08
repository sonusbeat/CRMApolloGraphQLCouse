const User   = require("../models/User");
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: "variables.env" });
const generateToken = require("../helpers/generateToken");

// Resolvers
const resolvers = {

  Query: {
    getCourse: () => "List of courses"
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

        // Create new Instance of Model User
        const user = new User(input);

        // Save to database
        user.save();

        // Return the new user object
        return user;

      } catch( error ) {
        console.error(error);
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
      }

    }
  }

};

module.exports = resolvers;