const db = require("./../database/sakila.config");

getAccount = async (username) =>
  await db("v_users").where("username", username);

module.exports = {
  getAccount,
};
