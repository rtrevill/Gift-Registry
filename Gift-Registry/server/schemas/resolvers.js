const { User } = require('../models');

const resolvers = {
  Query: {

    getUsers: async() => {
      return await User.find({})
    }

  },

  Mutation: {

    addUser: async(parent, {userName, password}) => {
      return await User.create({userName, password})
    }
  }
};

module.exports = resolvers;
