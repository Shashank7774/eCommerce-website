const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  images: {type: [String],
    default: []
  },
  stock: Number,   // 👈 important
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);
