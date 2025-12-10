const { DateConversion } = require('../utils/dateconversion');
const { Mailer } = require('../utils/mailer');

const { User, Registry, Invites } = require('../models');

const { signToken, AuthenticationError } = require("../utils/auth");
const { GraphQLError } = require('graphql')
const nodemailer = require('nodemailer');
// const { GET_USER_LISTS } = require('../../client/src/utils/mutations');



const resolvers = {
  Query: {

    getUsers: async() => {
      return await User.find({})
    },

    getLists: async() => {
      return await Registry.find({}).populate('owner')
    },

    getInvites: async(parent, {ownerId}) => {
      const userinvites = await User.findById(ownerId)
                                    .populate({path: "invites", 
                                      populate: [
                                        {path: "registries", model: "Registry"},
                                        {path: "host_user", model: "User"}]});
      return userinvites;
    },

    getUserLists: async(parent, {ownerId}) => {
      console.log(ownerId)
      const userregs = await Registry.find({ "$or": [ { "owner": ownerId }, { "participants": ownerId } ] }).populate("owner").populate("participants")
      return userregs
    },

    getPassword: async(parent, {receiver, vernum}) => {
        try {
          const subject = "Please verify your email";
          const text = `To continue with your user creation on Gift_Registry, please verify your email address by entering the following number when prompted: ${vernum}` 
          const html = `<p>To continue with your user creation on Gift_Registry, please verify your email address by entering the following number when prompted:</p><br/><h2>${vernum}</h2><p>This number is valid for 5 minutes</p>`
          const sendmail = Mailer({receiver, subject, text, html})
          return sendmail
        } catch (error) {
          return error
        }

    }



  },

  Mutation: {

    addUser: async(parent, {userName, firstName, lastName, password, emailAddress}) => {
      try {
        const validateEmail = await User.find({ "$or": [ { emailAddress }, { userName } ] })
        if (validateEmail.length === 0){
          return await User.create({userName, firstName, lastName, password, emailAddress})
        }
        else{
          const emailCount = validateEmail.filter((entry) => entry.emailAddress === emailAddress)
          switch (emailCount.length){
            case 0:
              throw new GraphQLError("Username already registered", {extensions: {code: 'UNAUTHENTICATED',}});
              break;
            default:
                throw new GraphQLError("Email address already registered", {extensions: {code: 'UNAUTHENTICATED',}});
          }
        }
      } catch (error) {
        return error
      }
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

    sendInvite: async(parent, {hostId, guestId, regId}) => {
      try{
        for (const individ of guestId){
          await Invites.create({host_user: hostId, registries: regId})
          .then(async(result) => {
            const addToInvitee = await User.findByIdAndUpdate(individ, {$push: {invites: result._id}})
            return addToInvitee
          })
          .catch(err => {
            console.error('Error creating document', err)
          })
        }
        return "Success"
      }catch(err){
        return err
      }

    },

    refuseInvite: async(parent, {regId, inviteeId}) => {
      let returningvalue
      try {
        await Invites.findByIdAndDelete(regId)
        .then(async()=> {
                          const deleteIt = await User.findByIdAndUpdate(inviteeId, {$pull: {"invites": regId}}).populate({path: "invites", 
                                      populate: [
                                        {path: "registries", model: "Registry"},
                                        {path: "host_user", model: "User"}]});;
          returningvalue = deleteIt
        })
        if (returningvalue){
          return returningvalue
        }
      } catch (error) {
        console.error(error)
      }
    },

    acceptInvite: async(parent, {userId, registryId, inviteId}) => {
      let confirmation
      try {
        await Registry.findByIdAndUpdate(registryId, {$push: {"participants": userId}})
        .then(async(response) => {
          await User.findByIdAndUpdate(userId, {$pull: {"invites": inviteId}})
        })
        .then(async(response) => {
          await Invites.findByIdAndDelete(inviteId)
        })
        .then(()=>{
          confirmation = "All Done"
        })
        if(confirmation){
          return confirmation
        }       
      } catch (error) {
        console.error(error)
        return error
      }
    },

  }
};

module.exports = resolvers;
