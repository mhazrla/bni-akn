const model = require("../../model/request.model");
const api = require("../../tools/common");

getAllRequests = async (req, res) => {
  const username = req.user.username;

  let data;
  if (username === "Admin") {
    data = await model.getAllRequests();
  } else {
    data = await model.getVendorRequestsByUsername(username);
  }

  return api.ok(res, data);
};

getRequest = async (req, res) => {
  const { id } = req.params;
  let data = await model.getRequest(id);
  return api.ok(res, data);
};

insertRequest = async (req, res) => {
  let {
    id_product,
    jumlah,
    harga_total,
    contact_person,
    tanggal,
    no_po,
    is_verified,
  } = req.body;

  const request = await model.insertRequest({
    id_product,
    jumlah,
    harga_total,
    contact_person,
    tanggal,
    no_po,
    is_verified,
  });
  if (request.length === 0) return api.error(res, "Bad Request", 400);

  const data = await model.getRequest(request[0]);

  return api.ok(res, data);
};

updateRequest = async (req, res) => {
  const { id } = req.params;
  const {
    id_product,
    jumlah,
    harga_total,
    contact_person,
    tanggal,
    no_po,
    is_verified,
  } = req.body;
  const request = await model.getRequest(id);

  if (request.length === 0) return api.error(res, "Request not found!", 404);
  await model.updateRequest(id, {
    id_product,
    jumlah,
    harga_total,
    contact_person,
    tanggal,
    no_po,
    is_verified,
  });

  const data = await model.getRequest(id);
  return api.ok(res, data);
};

deleteRequest = async (req, res) => {
  const { id } = req.params;
  const request = await model.getRequest(id);
  if (request.length === 0) return api.error(res, "Request Not Found", 404);

  const data = await model.deleteRequest(id);
  if (data.length === 0) {
    return api.error(res, "Bad Request", 400);
  }
  return api.ok(res, data);
};

verifiedRequest = async (req, res) => {
  const data = await model.verifiedRequest();
  return api.ok(res, data);
};

module.exports = {
  getAllRequests,
  getRequest,
  insertRequest,
  updateRequest,
  deleteRequest,
  verifiedRequest,
};
