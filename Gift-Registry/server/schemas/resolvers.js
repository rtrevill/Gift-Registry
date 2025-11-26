const { User, Registry } = require('../models');

const { signToken, AuthenticationError } = require("../utils/auth");

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
    },

    login: async(parent, {input: { userName, password}}) => {
      
      const user = await User.findOne({userName});
      console.log(user, userName, password)

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user};
    },
  }
};

module.exports = resolvers;
