const aio_cms = require("./../database/sakila.config");

getAllPermissions = async () =>
  await aio_cms("mst_user_permission").select("*");

getPermission = async (id) =>
  await aio_cms("mst_user_permission").where("id", id);

insertPermission = async (data) =>
  await aio_cms("mst_user_permission").insert(data);

updatePermission = async (id, data) => {
  await aio_cms("mst_user_permission").where("id", id).update(data);
};

deletePermission = async (id) =>
  await aio_cms("mst_user_permission").where("id", id).del();

module.exports = {
  getAllPermissions,
  getPermission,
  insertPermission,
  updatePermission,
  deletePermission,
};
