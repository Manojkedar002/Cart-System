const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema(
  {
    product_code: {
      type: String,
      required: true,
      unique: true,
    },
    size: { type: mongoose.Schema.Types.Mixed, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    discount: { type: Number },
    quantity: { type: Number, required: true },
    status: { type: Boolean, default: false },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

exports.ProductDetails = mongoose.model("ProductDetails", productDetailsSchema);
