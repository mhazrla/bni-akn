const model = require("../../model/transaksi.model");
const api = require("../../tools/common");
const path = require("path");

getAllTransactions = async (req, res) => {
  let data = await model.getAllTransactions();
  return api.ok(res, data);
};

insertTransaction = async (req, res) => {
  const { nama_vendor, tanggal } = req.body;
  const invoice_path = req.files[0].filename;
  const request = await model.insertTransaksi({
    vendor: nama_vendor,
    tanggal,
    invoice_path,
  });
  if (request.length === 0) return api.error(res, "Bad Transaction", 400);

  const data = await model.getTransaksi(request[0]);

  return api.ok(res, data);
};

updateTransaction = async (req, res) => {
  const { id } = req.params;
  const data = await model.updateTransaction(id, { status: true });
  return api.ok(res, data);
};

deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const request = await model.getTransaction(id);
  if (request.length === 0) return api.error(res, "Transaction Not Found", 404);

  const data = await model.deleteTransaction(id);
  if (data.length === 0) {
    return api.error(res, "Bad Transaction", 400);
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
  getAllTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  downloadPdf,
};
