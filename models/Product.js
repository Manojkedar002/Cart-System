const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    thumbnail_image: { type: String, required: true },
    main_image: { type: String, required: true },
    product_code: [
      {
        type: mongoose.Schema.Types.String,
        ref: "ProductDetails",
        required: true,
      },
    ],
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

exports.Product = mongoose.model("Product", productSchema);
