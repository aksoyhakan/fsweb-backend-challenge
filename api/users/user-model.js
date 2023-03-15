const db = require("../../data/dbconfig");

async function getAll() {
  return await db("users as u")
    .leftJoin("roles as r", "r.roleId", "u.roleId")
    .select("u.*", "r.*");
}

async function getById(userId) {
  return await await db("users as u")
    .leftJoin("roles as r", "r.roleId", "u.roleId")
    .select("u.*", "r.*")
    .where({ userId })
    .first();
}

async function addUser(user) {
  const [newUserId] = await db("users").insert(user);
  return await getById(newUserId);
}

async function updateUser(userId, user) {
  return await db("users").where({ userId }).update(user);
}

async function removeUser(userId) {
  return await db("users").where({ userId }).del();
}

module.exports = { getAll, getById, addUser, updateUser, removeUser };
