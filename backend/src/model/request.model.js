const db = require("../database/sakila.config");

getAllRequests = async () => {
  const result = await db("request")
    .join("product", "product.id_product", "request.id_product")
    .select(
      "request.id as id",
      "product.id_product as id_product",
      "product.nama_barang as nama_barang",
      "request.jumlah as jumlah",
      "product.satuan as satuan",
      "product.harga as harga_satuan",
      "product.vendor_id as vendor_id",
      "product.no_telp as no_telp",
      "request.contact_person as contact_person",
      "request.harga_total as harga_total",
      "request.tanggal as tanggal",
      "request.no_po as no_po"
    )
    .where("is_verified", 0)
    .orderBy("product.nama_barang");

  return result;
};

const getVendorRequestsByUsername = async (username) => {
  const vendor = await db("mst_user")
    .select("id")
    .where("username", username)
    .first();

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const result = await db("request")
    .join("product", "product.id_product", "request.id_product")
    .join("mst_user", "mst_user.id", "product.vendor_id")
    .select(
      "request.id as id",
      "product.id_product as id_product",
      "product.nama_barang as nama_barang",
      "request.jumlah as jumlah",
      "product.satuan as satuan",
      "product.harga as harga_satuan",
      "product.vendor_id as vendor_id",
      "product.no_telp as no_telp",
      "request.contact_person as contact_person",
      "request.harga_total as harga_total",
      "request.tanggal as tanggal",
      "request.no_po as no_po"
    )
    .where("is_verified", 0)
    .andWhere("product.vendor_id", vendor.id)
    .orderBy("product.nama_barang");

  return result;
};

getRequest = async (id) => {
  const result = await db("request")
    .where("request.id", id)
    .join("product", "product.id_product", "request.id_product")
    .join("mst_user", "mst_user.id", "product.vendor_id")
    .select(
      "request.id as id",
      "product.id_product as id_product",
      "product.nama_barang as nama_barang",
      "request.jumlah as jumlah",
      "product.satuan as satuan",
      "product.harga as harga_satuan",
      "product.vendor_id as vendor_id",
      "product.no_telp as no_telp",
      "request.contact_person as contact_person",
      "request.harga_total as harga_total",
      "request.tanggal as tanggal",
      "request.no_po as no_po",
      "mst_user.name as vendor_name"
    );
  return result;
};

insertRequest = async (data) => {
  return await db("request").insert(data);
};

updateRequest = async (id, data) => {
  return await db("request").where("id", id).update(data);
};

deleteRequest = async (id) => {
  return await db("request").where("id", id).del();
};

verifiedRequest = async () => {
  return await db("request").where("is_verified", 0).update({ is_verified: 1 });
};

module.exports = {
  getAllRequests,
  getRequest,
  getUserPermission,
  getRolePermission,
  insertRequest,
  updateRequest,
  deleteRequest,
  verifiedRequest,
  getVendorRequestsByUsername,
};
