var express = require("express");
var router = express.Router();
const RolePermissionController = require("../../controller/master_controller/RolePermissionController");
const UserRoleController = require("./../../controller/master_controller/UserRoleController");
const RoleController = require("./../../controller/master_controller/RoleController");
const PermissionController = require("./../../controller/master_controller/PermissionController");
const StockController = require("./../../controller/master_controller/StockController ");
const RequestController = require("./../../controller/master_controller/RequestController ");
const TransactionController = require("./../../controller/master_controller/TransactionController");
const HistoryController = require("./../../controller/master_controller/HistoryController");
const { hasAccess } = require("../../services/permission.service");

const {
  pdfUploadMiddleware,
} = require("../../middleware/upload-file.middleware");

// Stock
router.get("/stock/:id", StockController.getStock);
router.post("/stock", StockController.insertStock);
// router.post("/stock", hasAccess("MSTR-CRUD"), StockController.insertStock);
router.put("/stock/:id", hasAccess("MSTR-CRUD"), StockController.updateStock);
router.delete(
  "/stock/:id",
  hasAccess("MSTR-CRUD"),
  StockController.deleteStock
);

// Producs
router.get("/products", StockController.getAllProducts);

// Request
router.get("/request/:id", RequestController.getRequest);
router.get("/verified/request/", RequestController.verifiedRequest);
router.post(
  "/request",
  hasAccess("CONT-READ"),
  RequestController.insertRequest
);
router.put(
  "/request/:id",
  hasAccess("CONT-READ"),
  RequestController.updateRequest
);
router.delete(
  "/request/:id",
  hasAccess("MSTR-CRUD"),
  RequestController.deleteRequest
);

// Transaksi
router.put(
  "/transaction/:id",
  hasAccess("MSTR-CRUD"),
  pdfUploadMiddleware,
  TransactionController.updateTransaction
);

// History
router.get(
  "/history/:id",
  hasAccess("MSTR-CRUD"),
  HistoryController.getHistory
);
router.post(
  "/history",
  hasAccess("MSTR-CRUD"),
  HistoryController.insertHistory
);
router.put(
  "/history/:id",
  hasAccess("MSTR-CRUD"),
  HistoryController.updateHistory
);
router.delete(
  "/history/:id",
  hasAccess("MSTR-CRUD"),
  HistoryController.deleteHistory
);

// Roles
router.get("/roles", RoleController.getAllRole);
router.post("/role", RoleController.insertRole);
router.put("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

// Permissions
router.get("/permissions", PermissionController.getAllPermission);
router.post("/permission", PermissionController.insertPermission);
router.put("/permission/:id", PermissionController.updatePermission);
router.delete("/permission/:id", PermissionController.deletePermission);

// User Role
router.get("/user-data/user", UserRoleController.getAllUserRole);
router.get("/user-data/user/:id", UserRoleController.getUser);
router.post("/user-data/user", UserRoleController.insertUserRole);
router.put("/user-data/user/:id", UserRoleController.updateUserRole);
router.delete("/user-data/user/:id", UserRoleController.deleteUserRole);

// User Permission
router.get("/user-data/role", RolePermissionController.getAllRolePermission);
router.get(
  "/user-data/role/:role_id",
  RolePermissionController.getRolePermission
);
router.post("/user-data/role", RolePermissionController.insertRolePermission);
router.put(
  "/user-data/role/:role_id",
  RolePermissionController.updateRolePermission
);
router.delete(
  "/user-data/role/:role_id",
  RolePermissionController.deleteRolePermission
);
module.exports = router;
