const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/route");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const User = require("./model/model");
require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./apollo/typeDefs");
const resolvers = require("./apollo/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,

  playground: true,
});

// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.URL,
//     methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(
//   session({
//     secret: "my_secretis secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//       // sameSite: "none",
//       secure: true,
//     },
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://gur:gur123456@nodetuts.mx3oj.mongodb.net/friendbook?retryWrites=true&w=majority",
//       collection: "sessions",
//     }),
//   })
// );
// app.set("trust proxy", 1);
// mongoose.connect(
//   "mongodb+srv://gur:gur123456@nodetuts.mx3oj.mongodb.net/friendbook?retryWrites=true&w=majority",

//   () => {
//     app.listen(process.env.PORT, () =>
//       console.log("listening at " + process.env.PORT + "and " + process.env.URL)
//     );
//   }
// );
server.listen().then((url) => {
  mongoose.connect(
    "mongodb+srv://gur:gur123456@nodetuts.mx3oj.mongodb.net/newbook?retryWrites=true&w=majority"
  );
  console.log(url.url);
});

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }, async function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, "Username Not Found !!!");
//       }
//       const isValid = await bcrypt.compare(password, user.password);
//       if (!isValid) {
//         return done(null, "Wrong Password !!!");
//       }
//       return done(null, user);
//     });
//   })
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) {
//       return done(err);
//     }

//     done(null, user);
//   });
// });

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(router);
