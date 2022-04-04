const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   password: { type: String, required: true },
//   friend: [
//     {
//       username: String,
//     },
//   ],
//   pending: [
//     {
//       username: String,
//     },
//   ],
//   sentRequest: [
//     {
//       username: String,
//     },
//   ],
//   comments: [
//     {
//       comment: String,
//       userId: String,
//       time: Number,
//       likes: [
//         {
//           username: { type: String, unique: true },
//           firstname: String,
//           lastname: String,
//         },
//       ],
//       subcomment: [
//         {
//           comment: String,
//           subId: String,
//           commentUsername: String,
//           firstname: String,
//           lastname: String,
//         },
//       ],
//     },
//   ],
// });

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: String,
  friend: [
    {
      username: { type: String },
    },
  ],
  pending: [
    {
      username: { type: String },
    },
  ],
  sentRequests: [
    {
      username: { type: String },
    },
  ],
  posts: [
    {
      text: String,
      likes: [{ username: { type: String } }],
      comments: [{ text: String, username: { type: String } }],
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
