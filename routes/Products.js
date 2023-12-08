const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  fetchAllProductById,
  updateProduct,
} = require("../controller/Product");
const router = express.Router();

router.post("/", createProduct);
router.get("/", fetchAllProducts);
router.get("/:id", fetchAllProductById);
router.patch("/:id", updateProduct);

exports.router = router;
