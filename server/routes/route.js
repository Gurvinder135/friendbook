const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  postLogin,
  postRegister,
  isAuthenticate,
  postComment,
  deleteComment,
  postSubComment,
  search,
  friend,
  like,
} = require("../controller/controller");

router.post("/login", postLogin);

router.post("/register", postRegister);
router.get("/isAuthenticate", isAuthenticate);
router.get("/logout", (req, res) => {
  req.logout();
  res.send("success");
});
router.post("/postComment", postComment);
router.delete("/deleteComment/:username/:id", deleteComment);

router.post("/postsubComment", postSubComment);
router.post("/search", search);
router.post("/friend", friend);
router.post("/like", like);
module.exports = router;
