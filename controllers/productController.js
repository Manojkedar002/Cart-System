const { Product } = require("../models/Product");
const path = require("path");
const mongoose = require("mongoose");
const addProductController = async (req, res) => {
  try {
    const thumbnail_image = req.files.thumbnail_image[0];
    const main_image = req.files.main_image[0];

    if (!thumbnail_image || !main_image) {
      return res.status(400).send({
        success: false,
        message: "Both thumbnail_image and main_image are required",
      });
    }

    const thumbnail_image_path = path.join(__dirname, "../uploads");
    const main_image_path = path.join(__dirname, "../uploads");

    const { title, description, status, product_code } = req.body;
    const product = await Product.create({
      title,
      description,
      status,
      product_code,
      thumbnail_image: thumbnail_image_path,
      main_image: main_image_path,
    });
    return res.status(201).send({
      success: true,
      message: "product added succesfully",
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Error in addProductController",
    });
  }
};

//get product with details
const getProductController = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: "productdetails",
          localField: "product_code",
          foreignField: "product_code",
          as: "Product-information",
        },
      },
      {
        $unwind: { path: "$Product-information" },
      },
    ]);
    if (!product || product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "view product information succesfully",
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in getProductController",
    });
  }
};
//update product details
const updateProductController = async (req, res) => {
  try {
    const updatedproduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedproduct) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "product updated succesfully",
      updatedproduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in updateProductController",
    });
  }
};
//delete product controllers
const deleteProductController = async (req, res) => {
  try {
    const deletedproduct = await Product.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deletedproduct) {
      return res.status(404).send({
        success: false,
        message: "product not found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "product deleted succesfully",
      deletedproduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in delete",
    });
  }
};
module.exports = {
  addProductController,
  getProductController,
  updateProductController,
  deleteProductController,
};
