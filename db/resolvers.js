// Resolvers
const resolvers = {

  Query: {
    getCourse: () => "Lorem Ipsum dolor dolem"
  },

  Mutation: {
    newUser: (_, {input} ) => {
      console.log( input );

      return "Creating ...";
    }
  }

};

module.exports = resolvers;