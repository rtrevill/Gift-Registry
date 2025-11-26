const typeDefs = `

  scalar Date

  type Users {
    _id: ID
    userName: String
    password: String
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
    participants: ID
    general_items: [String]
    specific_items: [SpecificItems]
  }

  type Query {
    getUsers: [Users]
    getLists: [Registry]
  }

  type Mutation {
    addUser(userName: String, password: String): Users! 
  }

`;

module.exports = typeDefs;
