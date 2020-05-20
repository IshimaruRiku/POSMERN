const express = require("express");
const router = express.Router();

const OrdersController = require("../controllers/orders");

router.get("/", OrdersController.getAllOrders);

router.post("/", OrdersController.postOneOrder);

router.delete("/", OrdersController.deleteAllOrders);

router.get("/:orderId", OrdersController.getOneOrder);

router.put("/:orderId", OrdersController.putOneOrder);

router.patch("/:orderId", OrdersController.patchOneOrder);

router.delete("/:orderId", OrdersController.deleteOneOrder);

module.exports = router;
