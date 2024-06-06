const {
  groupAndConcatPermissions,
} = require("../../services/permission.service");
const model = require("../../model/stock.model");
const api = require("../../tools/common");

getAllStocks = async (req, res) => {
  let data = await model.getAllStocks();
  return api.ok(res, data);
};

getStock = async (req, res) => {
  const { id } = req.params;
  let data = await model.getStock(id);
  return api.ok(res, data);
};

getAllProducts = async (req, res) => {
  let data = await model.getProducts();
  return api.ok(res, data);
};

insertStock = async (req, res) => {
  const { jumlah, satuan, id_product } = req.body;
  const stock = await model.insertStock({ jumlah, satuan, id_product });
  if (stock.length === 0) return api.error(res, "Bad Request", 400);
  const data = await model.getStock(stock[0]);

  return api.ok(res, data);
};

updateStock = async (req, res) => {
  const { id } = req.params;
  const { jumlah, satuan, id_product } = req.body;

  await model.updateStock(id, { jumlah, satuan, id_product });
  const data = await model.getStock(id);
  return api.ok(res, data);
};

deleteStock = async (req, res) => {
  const { id } = req.params;
  const stock = await model.getStock(id);
  if (stock.length === 0) return api.error(res, "Stock Not Found", 404);

  const data = await model.deleteStock(id);
  if (data.length === 0) {
    return api.error(res, "Bad Request", 400);
  }
  return api.ok(res, data);
};

module.exports = {
  getAllStocks,
  getStock,
  getAllProducts,
  insertStock,
  updateStock,
  deleteStock,
};
