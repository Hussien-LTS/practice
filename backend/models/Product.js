const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }, // URL to the image
    stock: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the product
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
