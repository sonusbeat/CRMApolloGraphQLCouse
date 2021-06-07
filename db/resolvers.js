const User   = require("../models/User");
const bcrypt = require("bcryptjs");

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

      // Create Token
    }
  }

};

module.exports = resolvers;