const aio_cms = require("./../database/sakila.config");

getAllRoles = async () => await aio_cms("mst_user_role").select("*");

getRole = async (id) => await aio_cms("mst_user_role").where("id", id);

insertRole = async (data) => await aio_cms("mst_user_role").insert(data);

updateRole = async (id, data) => {
  await aio_cms("mst_user_role").where("id", id).update(data);
};

deleteRole = async (id) => await aio_cms("mst_user_role").where("id", id).del();

module.exports = {
  getAllRoles,
  getRole,
  insertRole,
  updateRole,
  deleteRole,
};
