const User = require("../model/model");
const bcrypt = require("bcrypt");
const passport = require("passport");

const addingUser = (ar, username, firstname, lastname, us) => {
  let arr = [...ar];
  for (let x in arr) {
    arr[x].username = username;
    arr[x].firstname = firstname;
    arr[x].lastname = lastname;
    arr[x].like = false;
    for (let y in arr[x].likes) {
      if (arr[x].likes[y].username === us) {
        arr[x].like = true;
      }
    }
  }

  return arr;
};

const sort = async (username) => {
  let primary = await User.findOne({ username: username }).lean();
  priArr = [...primary.comments];
  priArr = addingUser(
    priArr,
    primary.username,
    primary.firstname,
    primary.lastname,
    primary.username
  );
  let temp = [];
  for (let val in primary.friend) {
    let x = primary.friend[val];

    let sec = await User.find({ username: x.username }).lean();
    let comment = addingUser(
      sec[0].comments,
      sec[0].username,
      sec[0].firstname,
      sec[0].lastname,
      primary.username
    );
    temp = [...temp, ...comment];
  }
  let finalArr = [...priArr, ...temp];
  finalArr.sort(function (a, b) {
    return b.time - a.time;
  });
  return finalArr;
};

module.exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      res.status(401).send(error);
    } else if (!user) {
      res.status(401).send(user);
    } else {
      if (user === "Username Not Found !!!" || user === "Wrong Password !!!") {
        res.status(200).send(user);
        next();
      } else
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          res.status(200).send(user);
          next();
        });
    }
  })(req, res);
};

module.exports.postRegister = async (req, res) => {
  let salt = await bcrypt.genSalt();
  let newUser = req.body;
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const user = new User(req.body);
  await user.save();

  res.send("/");
};

module.exports.postComment = async (req, res) => {
  let { username, input } = req.body;
  let result = await User.findOne({ username: username });

  let newArray = [
    { comment: input, userId: result.id, time: Date.now() },
    ...result.comments,
  ];
  let result1 = await User.findOneAndUpdate(
    { username: username },
    { comments: newArray },
    {
      new: true,
    }
  );

  sort(result1.username).then((result) => {
    comment = result;
    res.send(comment);
  });
};

module.exports.isAuthenticate = (req, res) => {
  if (req.user) {
    let comment = [];
    sort(req.user.username).then((result) => {
      comment = result;

      res.send({
        auth: req.isAuthenticated(),
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        comment: comment,
      });
    });
  } else {
    res.send("error");
  }
};

module.exports.deleteComment = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { username: req.params.username },
    { $pull: { comments: { _id: req.params.id } } },
    {
      new: true,
    }
  );
  sort(user.username).then((result) => {
    comment = result;
    res.send(comment);
  });
};

module.exports.postSubComment = async (req, res) => {
  let { username, subInput, _id, id } = req.body;
  let result = await User.findById(id);
  let poster = await User.findOne({ username: username });
  let temp = {};

  for (let x in result.comments) {
    if (result.comments[x].id === _id) {
      temp = result.comments[x];
      let newArray = [
        {
          comment: subInput,
          subId: result.id,
          commentUsername: username,
          firstname: poster.firstname,
          lastname: poster.lastname,
        },
        ...temp.subcomment,
      ];
      let newObj = [...result.comments];
      newObj[x].time = Date.now();
      newObj[x].subcomment = newArray;
      await User.findOneAndUpdate(
        { username: result.username },
        { comments: newObj },
        {
          new: true,
        }
      );
      sort(username).then((result) => {
        comment = result;
        res.send(comment);
      });
    }
  }
};

module.exports.search = async (req, res) => {
  if (req.isAuthenticated()) {
    if (req.body.query === "") {
      let doc = await User.find({});
      res.send(doc);
    } else {
      let doc = await User.find({
        $or: [
          { firstname: { $regex: req.body.query, $options: "i" } },
          { lastname: { $regex: req.body.query, $options: "i" } },
        ],
      }).limit(10);

      res.send(doc);
    }
  } else {
    res.send("invalid");
  }
};

module.exports.friend = async (req, res) => {
  if (req.isAuthenticated()) {
    if (req.body.status === "sent") {
      await User.findOneAndUpdate(
        { username: req.body.self },
        { $push: { sentRequest: { username: req.body.third } } }
      );
      await User.findOneAndUpdate(
        { username: req.body.third },
        { $push: { pending: { username: req.body.self } } }
      );
    } else if (req.body.status === "confirm") {
      await User.findOneAndUpdate(
        { username: req.body.self },
        {
          $pull: { pending: { username: req.body.third } },
          $push: { friend: { username: req.body.third } },
        }
      );
      await User.findOneAndUpdate(
        { username: req.body.third },
        {
          $pull: { sentRequest: { username: req.body.self } },
          $push: { friend: { username: req.body.self } },
        }
      );
    }

    res.send("sucess");
  } else {
    res.send("invalid");
  }
};
module.exports.like = async (req, response) => {
  let result = await User.findOne({ username: req.body.cuser });
  let likeObj = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  // console.log(result.comments[1].id, req.body.id);
  for (let x in result.comments) {
    let stop = 0;
    if (result.comments[x].id === req.body.id) {
      for (let y in result.comments[x].likes) {
        if (result.comments[x].likes[y].username === req.body.username) {
          result.comments[x].likes.splice(y, 1);
          stop = 1;
        }
      }
      if (stop === 0) {
        result.comments[x].likes.push(likeObj);
      }

      let res = await User.findOneAndUpdate(
        { username: req.body.cuser },
        {
          comments: result.comments,
        },
        {
          new: true,
        }
      );
      sort(req.body.username).then((comment) => {
        response.send(comment);
        return;
      });
    }
  }
};
