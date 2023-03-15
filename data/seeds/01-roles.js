/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const roleData = [{ role: "admin" }, { role: "user" }];

exports.roleData = roleData;

exports.seed = async function (knex) {
  return await knex("roles").insert(roleData);
};
