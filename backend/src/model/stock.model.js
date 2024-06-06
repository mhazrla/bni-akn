const { restart } = require("nodemon");
const db = require("./../database/sakila.config");

getProducts = async () =>
  await db("product")
    .join("mst_user", "product.vendor_id", "mst_user.id")
    .select(
      "id_product",
      "nama_barang",
      "jumlah",
      "satuan",
      "harga",
      "vendor_id",
      "mst_user.name as vendor_name"
    );

getAllStocks = async () => {
  const result = await db("stock")
    .join("product", "product.id_product", "stock.id_product")
    .join("mst_user", "mst_user.id", "product.vendor_id")
    .select(
      "stock.id as id",
      "product.id_product as id_product",
      "product.nama_barang as nama_barang",
      "product.no_telp as no_telp",
      "product.harga as harga",
      "stock.jumlah as jumlah",
      "stock.satuan as satuan",
      "mst_user.name as vendor_name"
    )
    .orderBy("product.nama_barang");

  return result;
};

getStock = async (id) => {
  const result = await db("stock")
    .where("stock.id", id)
    .join("product", "product.id_product", "stock.id_product")
    .join("mst_user", "mst_user.id", "product.vendor_id")
    .select(
      "stock.id as id",
      "product.id_product as id_product",
      "product.nama_barang as nama_barang",
      "product.harga as harga",
      "product.vendor_id as vendor_id",
      "stock.jumlah",
      "stock.satuan",
      "mst_user.name as vendor_name"
    );
  return result;
};

insertStock = async (data) => {
  return await db("stock").insert(data);
};

updateStock = async (id, data) => {
  return await db("stock").where("id", id).update(data);
};

deleteStock = async (id) => {
  return await db("stock").where("id", id).del();
};

module.exports = {
  getProducts,
  getAllStocks,
  getStock,
  getUserPermission,
  getRolePermission,
  insertStock,
  updateStock,
  deleteStock,
};
