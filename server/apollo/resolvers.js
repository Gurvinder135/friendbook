const User = require("../model/model");

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({});
    },
    userByUserName: async (_, args) => {
      try {
        return await User.findOne({ userName: args.userName }, errorHAndler);
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      try {
        let newUser = new User(args);
        return await newUser.save();
      } catch (err) {
        console.log(err);
      }
    },
    loginUser: async (_, args) => {
      let res = await User.findOne({ username: args.username });
      if (res && res.password === args.password) {
        return res;
      } else {
        return new Error("please check username or password");
      }
    },

    addPost: async (_, args) => {
      return await User.findOneAndUpdate(
        { username: args.username },
        { $push: { posts: { text: args.text } } },
        {
          new: true,
        }
      );
    },
    deletePost: async (_, args) => {
      return await User.findOneAndUpdate(
        { username: args.username },
        { $pull: { posts: { _id: args.id } } },
        {
          new: true,
        }
      );
    },
    addImage: async (_, args) => {
      return await User.findOneAndUpdate(
        { username: args.username },
        { $push: { posts: { image: args.image } } },
        {
          new: true,
        }
      );
    },
    addLike: async (_, args) => {
      let result = await User.findOne(
        {
          username: args.author,
          "posts._id": args.postId,
        },
        { "posts.$": 1 }
      );

      let index = result.posts[0].likes.findIndex((arr) => {
        return arr.username === args.username;
      });
      if (index === -1) {
        result.posts[0].likes.push({ username: args.username });
      } else result.posts[0].likes.splice(index, 1);

      return await User.findOneAndUpdate(
        { username: args.author, "posts._id": args.postId },
        { $set: { "posts.$.likes": result.posts[0].likes } },
        {
          new: true,
        }
      );
    },
    addComment: async (_, args) => {
      return await User.findOneAndUpdate(
        { username: args.author, "posts._id": args.postId },
        {
          $push: {
            "posts.$.comments": { text: args.text, username: args.username },
          },
        },
        {
          new: true,
        }
      );
    },

    addProfilePic: async (_, args) => {
      return await User.findOneAndUpdate(
        { username: args.username },
        { profilePic: args.URL },
        {
          new: true,
        }
      );
    },
    sendRequest: async (_, args) => {
      await User.findOneAndUpdate(
        { userName: args.reciever },
        {
          $push: {
            pending: { username: args.sender },
          },
        }
      );
      return await User.findOneAndUpdate(
        { userName: args.sender },
        {
          $push: {
            sentRequests: { username: args.reciever },
          },
        },
        {
          new: true,
        }
      );
    },
    acceptRequest: async (_, args) => {
      await User.findOneAndUpdate(
        { userName: args.otherUser },
        {
          $push: {
            friend: { username: args.accepter },
          },
          $pull: {
            sentRequests: { username: args.accepter },
          },
        }
      );
      return await User.findOneAndUpdate(
        { userName: args.accepter },
        {
          $push: {
            friend: { username: args.otherUser },
          },
          $pull: {
            pending: { username: args.otherUser },
          },
        },
        {
          new: true,
        }
      );
    },
  },
  //   User: {
  //     posts: (parent, args) => {
  //       return [{ text: "123", author: {"dd"}, likes: [{}], comments: [{}] }];
  //     },
  //   },
};
module.exports = resolvers;
