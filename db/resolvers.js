const User   = require("../models/User");
const bcrypt = require("bcryptjs");

// Resolvers
const resolvers = {

  Query: {
    getCourse: () => "Lorem Ipsum dolor dolem"
  },

  Mutation: {
    newUser: async (_, {input} ) => {
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
      

    }
  }

};

module.exports = resolvers;