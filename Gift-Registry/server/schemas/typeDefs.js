const typeDefs = `

  type Users {
    _id: ID
    userName: String
    password: String
  }

  type Query {
    getUsers: [Users]
  }

  type Mutation {
    addUser(userName: String, password: String): Users! 
  }

`;

module.exports = typeDefs;
