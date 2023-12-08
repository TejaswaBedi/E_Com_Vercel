const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/Order");

const router = express.Router();

router.post("/", createOrder);
router.get("/own/", fetchOrdersByUser);
router.delete("/:id", deleteOrder);
router.patch("/:id", updateOrder);
router.get("/", fetchAllOrders);

exports.router = router;
