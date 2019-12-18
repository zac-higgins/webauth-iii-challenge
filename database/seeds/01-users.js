exports.seed = function (knex) {
  return knex("users").insert([
    { username: "khalid", password: "pass", department: "Development" },
    { username: "john", password: "pass", department: "HR" },
    { username: "ingrid", password: "pass", department: "IT" },
  ]);
};