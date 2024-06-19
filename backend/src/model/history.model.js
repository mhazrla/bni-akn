const db = require("../database/sakila.config");

getAllHistories = async () => {
  const result = await db("pencatatan")
    .join("product", "product.id_product", "pencatatan.id_product")
    .select(
      "pencatatan.id as id",
      "product.id_product as id_product",
      "product.nama_barang as nama_barang",
      db.raw("SUM(pencatatan.barang_masuk) as barang_masuk"),
      db.raw("SUM(pencatatan.barang_keluar) as barang_keluar"),
      "pencatatan.uraian as uraian",
      "pencatatan.tanggal as tanggal"
    )
    .groupBy(
      "product.id_product",
      "product.nama_barang",
      "pencatatan.uraian",
      "pencatatan.tanggal"
    )
    .orderBy("product.nama_barang");

  return result;
};

getHistoriesById = async (id) => {
  const result = await db("pencatatan").where("id", id).select("*");
  return result;
};

getHistory = async (id) => {
  const result = await db("pencatatan")
    .where("pencatatan.id", id)
    .join("product", "pencatatan.id_product", "product.id_product");

  return result;
};

insertHistory = async (data) => {
  return await db("pencatatan").insert(data);
};

updateHistory = async (id, data) => {
  return await db("pencatatan").where("id", id).update(data);
};

deleteHistory = async (id) => {
  return await db("pencatatan").where("id", id).del();
};

verifiedHistory = async () => {
  return await db("pencatatan")
    .where("is_verified", 0)
    .update({ is_verified: true });
};

module.exports = {
  getAllHistories,
  getHistoriesById,
  getHistory,
  getUserPermission,
  getRolePermission,
  insertHistory,
  updateHistory,
  deleteHistory,
  verifiedHistory,
};
