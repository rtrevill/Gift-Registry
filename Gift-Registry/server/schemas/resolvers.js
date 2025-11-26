const { User, Registry } = require('../models');

const resolvers = {
  Query: {

    getUsers: async() => {
      return await User.find({})
    },

    getLists: async() => {
      return await Registry.find({}).populate('owner')
    },

  },

  Mutation: {

    addUser: async(parent, {userName, password}) => {
      return await User.create({userName, password})
    }
  }
};

module.exports = resolvers;
