const { DateConversion } = require('../utils/dateconversion');

const { User, Registry } = require('../models');

const { signToken, AuthenticationError } = require("../utils/auth");
// const { GET_USER_LISTS } = require('../../client/src/utils/mutations');



const resolvers = {
  Query: {

    getUsers: async() => {
      return await User.find({})
    },

    getLists: async() => {
      return await Registry.find({}).populate('owner')
    },

    getUserLists: async(parent, {ownerId}) => {
      console.log(ownerId)
      const userregs = await Registry.find({ "$or": [ { "owner": ownerId }, { "participants": ownerId } ] }).populate("owner").populate("participants")
      return userregs
    },



  },

  Mutation: {

    addUser: async(parent, {userName, password}) => {
      return await User.create({userName, password})
    },

    login: async(parent, {input: { userName, password}}) => {
      
      const user = await User.findOne({userName});

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

    addRegistry: async(parent, {title, occasion, valid, owner}) => {
      const dateObject = DateConversion(valid)
      console.log(valid, dateObject)
      const addReg = (await Registry.create({title, occasion, valid_to: dateObject, owner})).populate("owner")
      return addReg;
    },

    removeRegistry: async(parent, {regId, ownerId}) => {
      const removeone = await Registry.findByIdAndDelete(regId)
      if (removeone){
        const userregs = await Registry.find({ "$or": [ { "owner": ownerId }, { "participants": ownerId } ] }).populate("owner").populate("participants")
        return userregs
      }
      else{
        return AuthenticationError
      }
    },

  }
};

module.exports = resolvers;
