const { ProductDetails } = require("../models/ProductDetails");

//add productDetails
const addProductDetailsController = async (req, res) => {
  try {
    const { size, price, mrp, discount, quantity, status } = req.body;
    if (!size || !price || !mrp || !discount || !quantity || !status) {
      return res.status(400).send({
        success: false,
        message: "please provide required field",
      });
    }
    const product_code = Math.floor(10000000 + Math.random() * 90000000);
    const productdetails = await ProductDetails.create({
      size,
      price,
      mrp,
      discount,
      quantity,
      status,
      product_code: product_code,
    });
    return res.status(200).send({
      success: true,
      message: "productDetails added succesfully",
      productdetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in addProductDetailsController",
    });
  }
};
//get productDetails
const getProductDetailsController = async (req, res) => {
  try {
    const product_code = req.params.product_code;
    const productdetails = await ProductDetails.findOne({ product_code });
    return res.status(200).send({
      success: true,
      message: "view productDetails succesfully",
      productdetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in getProductDetailsController",
    });
  }
};
//update productDetails
const updateProductDetailsController = async (req, res) => {
  try {
    const product_code = req.params.product_code;
    const productdetails = await ProductDetails.findOneAndUpdate(
      { product_code },
      req.body,
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "ProductDetails updated succesfully",
      productdetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in updateProductDetailsController",
    });
  }
};
//delete productDetails
const deleteProductDetailsController = async (req, res) => {
  try {
    const product_code = req.params.product_code;
    const productdetails = await ProductDetails.findOneAndDelete({
      product_code,
    });
    return res.status(200).send({
      success: true,
      message: "productDetails deleted succesfully",
      productdetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in deleteProductDetailsController",
    });
  }
};
module.exports = {
  addProductDetailsController,
  getProductDetailsController,
  updateProductDetailsController,
  deleteProductDetailsController
};
