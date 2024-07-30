const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_code: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    size: { type: mongoose.Schema.Types.Mixed, required: true },
    quantity: { type: Number, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

exports.Cart = mongoose.model("Cart", cartSchema);
