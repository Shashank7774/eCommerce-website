const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        qty: Number,
        image: String
      }
    ],
    deliveryDetails: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPT", "Card"],
      default: "COD"
    },
    totalAmount: Number,
    status: {
      type: String,
      default: "Placed"
    },
    orderTime: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
