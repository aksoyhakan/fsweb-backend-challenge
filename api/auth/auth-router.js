const router = require("express").Router();
const authMd = require("./auth-middleware");
const db = require("../../data/dbconfig");
const { JWT_SECRET } = require("../config/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModels = require("../users/user-model");

router.post(
  "/login",
  authMd.checkPayloadLogin,
  authMd.usernameExisting,
  async (req, res, next) => {
    const searchedUser = await db("users as u")
      .leftJoin("roles as r", "r.roleId", "u.roleId")
      .select("u.*", "r.*")
      .where("username", req.body.username)
      .first();
    if (bcrypt.compareSync(req.body.password, searchedUser.password)) {
      const token = generateToken(searchedUser);
      const currentUser = {
        subject: searchedUser.userId,
        username: searchedUser.username,
        role: searchedUser.roleId == 1 ? "admin" : "user",
        avatarPhoto: searchedUser.avatarPhoto,
      };

      res.status(201).json({
        message: `${searchedUser.username} welcome`,
        token: token,
        currentUser: currentUser,
      });
    } else {
      next({ status: 402, message: "invalid entry" });
    }
  }
);

function generateToken(user) {
  let payload = {
    subject: user.userId,
    username: user.username,
    role: user.roleId == "1" ? "admin" : "user",
    avatarPhoto: user.avatarPhoto,
  };

  let option = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, JWT_SECRET, option);
}

router.post(
  "/register",
  authMd.checkPayloadRegister,
  authMd.uniqueValue,
  (req, res, next) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashPassword;

    req.body.roleId = 1;
    UserModels.addUser(req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) => next({ status: 500, message: "database problem" }));
  }
);

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
