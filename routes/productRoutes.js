const express = require("express");
const {
  addProductController,
  getProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");
const uploads = require("../middleware/uploads");
const router = express.Router();
//add product
router.post("/add-product", uploads, addProductController);
//get product with productDetails
router.get("/get-product/:id", getProductController);
//update product routes
router.put("/update-product/:id", updateProductController);
//delete product routes
router.delete("/delete-product/:id", deleteProductController);
module.exports = router;
