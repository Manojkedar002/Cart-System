const express = require("express");
const {
  addProductDetailsController,
  getProductDetailsController,
  updateProductDetailsController,
  deleteProductDetailsController,
} = require("../controllers/productDetailsController");
const router = express.Router();

//add ProductDetails
router.post("/add-product-details", addProductDetailsController);
//get productDetails
router.get("/get-product-details/:product_code", getProductDetailsController);
//update details
router.put(
  "/update-product-details/:product_code",
  updateProductDetailsController
);
//delete productDetails
router.delete(
  "/delete-product-details/:product_code",
  deleteProductDetailsController
);
module.exports = router;
