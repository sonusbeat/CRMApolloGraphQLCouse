const courses = [
    {
        title: 'JavaScript Definitive Modem Guide, Build +10 Projects',
        technology: 'JavaScript ES6',
    },
    {
        title: 'React – The Complete Guide: Hooks Context Redux MERN +15 Apps',
        technology: 'React',
    },
    {
        title: 'Node.js – Bootcamp Development Web, inc MVC and REST API’s',
        technology: 'Node.js'
    }, 
    {
        title: 'ReactJS Advanced – FullStack React GraphQL and Apollo',
        technology: 'React'
    },
    {
        title: 'NextJs – Next with Redux and MongoDB',
        technology: 'Next'
    }
];

// Resolvers
const resolvers = {
  Query: {
    getCourses: (_, { input }, context, info) => {
      const result = courses.filter((course) => {
        return course.technology === input.technology;
      });

      return result;
    },
  },
};

module.exports = resolvers;