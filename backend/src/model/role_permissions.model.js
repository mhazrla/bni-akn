const aio_cms = require("./../database/sakila.config");

getAllRolePermissions = async () => {
  const result = await aio_cms("mst_user_role")
    .join(
      "map_role_permission",
      "mst_user_role.id",
      "map_role_permission.role_id"
    )
    .join(
      "mst_user_permission",
      "map_role_permission.permission_id",
      "mst_user_permission.id"
    )
    .select(
      "mst_user_role.id as role_id",
      "mst_user_role.role_name",
      "mst_user_role.detail as role_detail",
      "mst_user_permission.id as permission_id",
      "mst_user_permission.code as permission_code"
    )
    .orderBy("map_role_permission.role_id");

  return result;
};

getUserPermission = async (nik) => {
  const result = await aio_cms("mst_user")
    .where("nik", nik)
    .select(
      "mst_user.id as user_id",
      "mst_user.nik",
      "mst_user.role_id",
      "mst_user_role.id as role_id",
      "mst_user_role.role_name",
      "mst_user_permission.id as permission_id",
      "mst_user_permission.code as permission_code",
      "mst_user_permission.detail as permission_detail"
    )
    .join("mst_user_role", "mst_user.role_id", "=", "mst_user_role.id")
    .join(
      "map_role_permission",
      "mst_user.role_id",
      "=",
      "map_role_permission.role_id"
    )
    .join(
      "mst_user_permission",
      "map_role_permission.permission_id",
      "=",
      "mst_user_permission.id"
    );

  return result;
};

getRolePermission = async (role_id) => {
  const result = await aio_cms("map_role_permission")
    .join("mst_user_role", "map_role_permission.role_id", "mst_user_role.id")
    .join(
      "mst_user_permission",
      "map_role_permission.permission_id",
      "mst_user_permission.id"
    )
    .where("map_role_permission.role_id", role_id)
    .select(
      "map_role_permission.id",
      "map_role_permission.role_id",
      "mst_user_role.role_name",
      "mst_user_role.detail as role_detail",
      "map_role_permission.permission_id",
      "mst_user_permission.code as permission_code"
    );
  return result;
};

insertRolePermission = async (data) => {
  await aio_cms("map_role_permission").insert(data);
};

updateRolePermission = async (role_id, data) =>
  await aio_cms("map_role_permission").where("role_id", role_id).update(data);

deleteRolePermission = async (role_id) => {
  await aio_cms("map_role_permission").where("role_id", role_id).del();
};

module.exports = {
  getAllRolePermissions,
  getUserPermission,
  getRolePermission,
  insertRolePermission,
  updateRolePermission,
  deleteRolePermission,
};
