const aio_cms = require("./../database/sakila.config");

getAllUsers = async () => await aio_cms("v_users").select("*");

getUser = async (id) => await aio_cms("v_users").where("id", id);

insertUserRole = async (data) => await aio_cms("mst_user").insert(data);

updateUserRole = async (id, data) => {
  await aio_cms("mst_user").where("id", id).update(data);
};

deleteUserRole = async (id) => await aio_cms("mst_user").where("id", id).del();

module.exports = {
  getUser,
  getAllUsers,
  insertUserRole,
  updateUserRole,
  deleteUserRole,
};
