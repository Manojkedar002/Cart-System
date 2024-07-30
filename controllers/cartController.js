const { Cart } = require("../models/Cart");
const { Product } = require("../models/Product");
const { User } = require("../models/User");

//add product into the cart
const addToCartController = async (req, res) => {
  try {
    const { size, quantity, product_code } = req.body;
    const user = await User.findById({ _id: req.user }); // userId coming from middleware

    // Retrieve product details
    const product = await Product.findOne({ _id: req.body.product_code });
    console.log(product);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the product is already in the user cart
    const existProduct = await Cart.findOne({
      user_id: user._id,
      product_code: { $in: [product_code] },
    });

    if (existProduct) {
      existProduct.quantity += quantity;
      await existProduct.save();

      return res.status(200).send({
        success: true,
        message: "Product quantity updated in the cart successfully",
        cartItem: existProduct,
      });
    }

    // Create a new Cart item
    const newCartItem = new Cart({
      user_id: user._id,
      product_code,
      size,
      quantity,
      createdBy: user._id,
    });

    // Save the new cart item
    await newCartItem.save();

    return res.status(200).send({
      success: true,
      message: "Product added to the cart successfully",
      cartItem: newCartItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in addToCartController",
    });
  }
};
//view product from cart
const getProductFromCartController = async (req, res) => {
  try {
    // userId coming from middleware
    const user = await User.findById(req.user);
    // Use aggregate
    const cartItems = await Cart.aggregate([
      {
        $match: { user_id: user._id },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_code",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Cart items retrieved successfully",
      cartItems: cartItems,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in getCartItemsController",
    });
  }
};
const updateCartProductController = async (req, res) => {
  try {
    const { product_code, quantity, size } = req.body;
    // userId coming from middleware
    const user = await User.findById(req.user);
    // Check if the product is in the user's cart
    const cartItem = await Cart.findOne({
      user_id: user._id,
      product_code: product_code,
    });

    if (!cartItem) {
      return res.status(404).send({
        success: false,
        message: "Product not found in the cart",
      });
    }

    // Update the quantity of the existing cart item
    cartItem.quantity = quantity;
    cartItem.size = size;
    await cartItem.save();

    res.status(200).send({
      success: true,
      message: "Product quantity updated in the cart successfully",
      cartItem: cartItem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in updateCartItemController",
    });
  }
};
//Delete product from cart
const deleteProductFromCartController = async (req, res) => {
  try {
    const { product_code } = req.body;
    const user = await User.findById(req.user);
    // Check if the product is in  user cart
    const cartItem = await Cart.findOneAndDelete({
      user_id: user._id,
      product_code: product_code,
    });

    if (!cartItem) {
      return res.status(404).send({
        success: false,
        message: "Product not found in the cart",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Product deleted from the cart successfully",
      cartItem: cartItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in deleteProductFromCartController",
    });
  }
};
module.exports = {
  addToCartController,
  getProductFromCartController,
  updateCartProductController,
  deleteProductFromCartController,
};
