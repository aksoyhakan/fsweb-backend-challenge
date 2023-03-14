const db = require("../../data/dbconfig");

async function getAll() {
  return await db("users");
}

async function getById(userId) {
  return await db("users").where({ userId }).first();
}

async function addUser(user) {
  const [newUserId] = await db("users").insert(user);
  return await getById(newUserId);
}

async function updateUser(userId, user) {
  return await db("users").where({ userId }).update(user);
}

async function removeUser(userId) {
  return await db("posts").where({ userId }).del();
}

module.exports = { getAll, getById, addUser, updateUser, removeUser };
