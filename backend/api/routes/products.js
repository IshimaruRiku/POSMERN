const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/products");

router.get("/", ProductsController.getAllProducts);

router.post("/", ProductsController.postOneProduct);

router.delete("/", ProductsController.deleteAllProducts);

router.get("/:productId", ProductsController.getOneProduct);

router.put("/:productId", ProductsController.putOneProduct);

router.patch("/:productId", ProductsController.patchOneProduct);

router.delete("/:productId", ProductsController.deleteOneProduct);

module.exports = router;
