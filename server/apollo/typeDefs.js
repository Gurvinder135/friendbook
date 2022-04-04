const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getUsers: [User]
    userByUserName(username: String!): User
  }
  type User {
    userName: String
    firstname: String
    lastname: String
    password: String
    userId: ID
    profilePic: String
    posts: [Post]
    friend: [String]
    sentRequests: [String]
    pending: [String]
  }
  type Post {
    text: String
    likes: [Like]
    image: String
    _id: ID
    comments: [Comment]
  }
  type Comment {
    text: String
    username: String
  }
  type Like {
    username: String
  }

  type Mutation {
    registerUser(
      userName: String!
      firstname: String!
      lastname: String!
      password: String!
    ): User

    loginUser(username: String!, password: String!): User

    addPost(username: String!, text: String!): User
    deletePost(username: String!, id: ID!): User
    addImage(username: String!, image: String!): User

    addComment(
      username: String!
      author: String!
      postId: ID!
      text: String!
    ): User

    addLike(username: String!, author: String!, postId: ID!): User
    addProfilePic(username: String!, URL: String!): User
    sendRequest(sender: String!, reciever: String!): User
    acceptRequest(accepter: String!, otherUser: String!): User
  }
`;

module.exports = typeDefs;
