const { JWT_SECRET } = require("../config/index");
const jwt = require("jsonwebtoken");
const db = require("../../data/dbconfig");

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        next({ status: 402, message: "Invalid token" });
      } else {
        req.userData = decodedJwt;
        next();
      }
    });
  } else {
    next({ status: 404, message: "Token not found" });
  }
}

function checkPayloadLogin(req, res, next) {
  const keyArray = ["username", "password"];
  keyArray.forEach((key) => {
    !req.body[key] &&
      next({ status: 404, message: `${key} property is missing` });
  });
  next();
}

function checkPayloadRegister(req, res, next) {
  const keyArray = ["username", "userEmail", "birthday", "password"];
  keyArray.forEach((key) => {
    !req.body[key] &&
      next({ status: 404, message: `${key} property is missing` });
  });
  next();
}

async function uniqueValue(req, res, next) {
  const keyArray = ["username", "userEmail"];
  keyArray.forEach(async (key) => {
    let searchedUser = await db("users").where(`${key}`, req.body[key]).first();
    searchedUser && next({ status: 402, message: `${key} is already used` });
  });
  next();
}

async function usernameExisting(req, res, next) {
  let searchedUser = await db("users")
    .where("username", req.body.username)
    .first();
  searchedUser
    ? next()
    : next({ status: 404, message: `${req.body.username} is not found` });
}

function roleCheck(req, res, next) {
  req.userData.role === "admin"
    ? next()
    : next({ status: 402, message: "You do not have authorization" });
}

module.exports = {
  restricted,
  checkPayloadLogin,
  checkPayloadRegister,
  uniqueValue,
  usernameExisting,
  roleCheck,
};
