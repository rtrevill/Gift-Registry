const typeDefs = `

  scalar Date

  input LoginInput {
    userName: String!
    password: String!
  }

  type Users {
    _id: ID
    userName: String!
    firstName: String
    lastName: String
    password: String!
    invites: [Invites]
    emailAddress: String!
  }

  type Auth {
    token: String!
    user: Users
  }

  type SpecificItems {
    item_type: String
    colour: String
    size: String
    brands: [String]
    preferred_retailers: [String]
  }

  type Registry {
    _id: ID!
    title: String!
    occasion: String
    valid_to: Date
    owner: Users
    participants: [Users]
    general_items: [String]
    specific_items: [SpecificItems]
  }

  type Invites {
    _id: ID
    host_user: Users
    registries: Registry
  }

  type Query {
    getUsers: [Users]
    getLists: [Registry]
    getInvites(ownerId: ID!): Users
    getUserLists(ownerId: ID!): [Registry]
    getPassword: String
  }

  type Mutation {
    addUser(userName: String, firstName: String, lastName: String, password: String, emailAddress: String): Users! 
    login(input: LoginInput): Auth
    addRegistry(title: String, occasion: String, valid: Date, owner: ID): Registry
    removeRegistry(regId: ID, ownerId: ID):[Registry]
    sendInvite(hostId: ID, guestId: [ID], regId: ID): String
    refuseInvite(regId: ID, inviteeId: ID): Users
    acceptInvite(userId: ID, registryId: ID, inviteId: ID): String
  }

`;

module.exports = typeDefs;
