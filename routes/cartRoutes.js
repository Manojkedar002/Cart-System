const express = require("express");

const {
  addToCartController,
  getProductFromCartController,
  updateCartProductController,
  deleteProductFromCartController,
} = require("../controllers/cartController");
const userAuthForCart = require("../middleware/userAuthForCart");
const router = express.Router();

//add product in Cart
router.post("/add-to-cart", userAuthForCart, addToCartController);
//get product in Cart
router.get("/get-cart", userAuthForCart, getProductFromCartController);
//update product in Cart
router.put("/update-cart", userAuthForCart, updateCartProductController);
//delete product in Cart
router.delete("/delete-cart", userAuthForCart, deleteProductFromCartController);
module.exports = router;
