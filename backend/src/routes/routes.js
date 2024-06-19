var express = require("express");
var router = express.Router();
const path = require("path");

const masterRoutes = require("./master_routes/master.routes");
const auth_routes = require("./utility_routes/auth.routes");
const adminRoutes = require("./master_routes/admin.routes");
const StockController = require("./../controller/master_controller/StockController ");
const RequestController = require("./../controller/master_controller/RequestController ");
const TransactionController = require("./../controller/master_controller/TransactionController");
const HistoryController = require("./../controller/master_controller/HistoryController");

const { verifyToken } = require("../services/auth.service");
const { hasAccess } = require("../services/permission.service");

const { pdfUploadMiddleware } = require("../middleware/upload-file.middleware");

// not found route
router.get("/not-found", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "../views/not-found.html"));
});

// Stock
router.get(
  "/stocks",
  verifyToken,
  hasAccess("CONT-READ"),
  StockController.getAllStocks
);

// Request
router.get(
  "/request",
  verifyToken,
  hasAccess("CONT-READ"),
  RequestController.getAllRequests
);

// transaction
router.get(
  "/transaction",
  verifyToken,
  hasAccess("CONT-READ"),
  TransactionController.getAllTransactions
);
router.get("/pdf/download/:filename", TransactionController.downloadPdf);
router.post(
  "/transaction",
  verifyToken,
  hasAccess("CONT-READ"),
  pdfUploadMiddleware,
  TransactionController.insertTransaction
);

// History
router.get(
  "/history/",
  verifyToken,
  hasAccess("CONT-ADD"),
  HistoryController.getAllHistories
);

// authentication routes usage
router.use("/auth/", auth_routes);
// router.use("/admin", verifyToken, hasAccess("MSTR-CRUD"), adminRoutes);
router.use("/admin", verifyToken, adminRoutes);
// router.use("/admin", adminRoutes);

// master data routes usage
router.use("/master/", verifyToken, masterRoutes);

//kecuali master, seharusnya routes dipisah per-table

module.exports = router;
