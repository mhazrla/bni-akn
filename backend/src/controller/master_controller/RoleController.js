const {
  groupAndConcatPermissions,
} = require("../../services/permission.service");
const model = require("./../../model/role.model");
const api = require("./../../tools/common");

getAllRole = async (req, res) => {
  let data = await model.getAllRoles();
  return api.ok(res, data);
};

insertRole = async (req, res) => {
  const body = ({ role_name, role_detail } = req.body);
  const role = await model.insertRole(body);
  if (role.length === 0) return api.error(res, "Bad Request", 400);

  const data = await model.getRole(role[0]);

  return api.ok(res, data);
};

updateRole = async (req, res) => {
  const { id } = req.params;
  const body = ({ role_name, detail } = req.body);
  const role = await model.getRole(id);

  if (role.length === 0) return api.error(res, "Role not found!", 404);
  const data = await model.updateRole(id, body);
  return api.ok(res, data);
};

deleteRole = async (req, res) => {
  const { id } = req.params;
  const role = await model.getRole(id);
  if (role.length === 0) return api.error(res, "Role Not Found", 404);

  const data = await model.deleteRole(id);
  if (data.length === 0) {
    return api.error(res, "Bad Request", 400);
  }
  return api.ok(res, data);
};

module.exports = {
  getAllRole,
  insertRole,
  updateRole,
  deleteRole,
};
