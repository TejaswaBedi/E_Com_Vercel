const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
} = require("../controller/Cart");
const router = express.Router();

router.post("/", addToCart);
router.get("/", fetchCartByUser);
router.delete("/:id", deleteFromCart);
router.patch("/:id", updateCart);

exports.router = router;
