const model = require("../../model/history.model");
const api = require("../../tools/common");
const path = require("path");

getAllHistories = async (req, res) => {
  const { id_product } = req.query;
  let data;
  if (id_product) {
    data = await model.getHistoriesByProductId(id_product);
  } else {
    data = await model.getAllHistories();
  }
  return api.ok(res, data);
};

getHistory = async (req, res) => {
  const { id } = req.params;
  let data = await model.getHistory(id);
  return api.ok(res, data);
};

insertHistory = async (req, res) => {
  const { barang_keluar, barang_masuk, id_product, tanggal, uraian } = req.body;
  const history = await model.insertHistory({
    barang_keluar,
    barang_masuk,
    id_product,
    tanggal,
    uraian,
  });
  if (history.length === 0) return api.error(res, "Bad Request", 400);

  const data = await model.getHistory(history[0]);

  return api.ok(res, data);
};

updateHistory = async (req, res) => {
  const { id } = req.params;
  const { barang_keluar, barang_masuk, id_product, tanggal, uraian } = req.body;

  const history = await model.updateHistory(id, {
    barang_keluar,
    barang_masuk,
    id_product,
    tanggal,
    uraian,
  });
  const data = await model.getHistory(id);

  return api.ok(res, data);
};

deleteHistory = async (req, res) => {
  const { id } = req.params;
  const history = await model.getHistory(id);
  if (history.length === 0) return api.error(res, "History Not Found", 404);

  const data = await model.deleteHistory(id);
  if (data.length === 0) {
    return api.error(res, "Bad Request", 400);
  }
  return api.ok(res, data);
};

downloadPdf = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../../../uploads/pdf/", filename);
    res.download(filePath, filename);
  } catch (err) {
    console.error("Error downloading file:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllHistories,
  insertHistory,
  updateHistory,
  getHistory,
  deleteHistory,
  downloadPdf,
};
