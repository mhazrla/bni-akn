const db = require("../database/sakila.config");

getAllTransactions = async () => await db("transaksi").select("*");

getTransaksi = async (id) => await db("transaksi").where("id", id);

insertTransaksi = async (data) => {
  return await db("transaksi").insert(data);
};

updateTransaction = async (id, data) => {
  return await db("transaksi").where("id", id).update(data);
};

deleteTransaksi = async (id) => {
  return await db("transaksi").where("id", id).del();
};

module.exports = {
  getAllTransactions,
  getTransaksi,
  getUserPermission,
  getRolePermission,
  insertTransaksi,
  updateTransaction,
  deleteTransaksi,
};
