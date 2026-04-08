const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// ADD PRODUCT (ADMIN)
router.post("/add", upload.array("images", 5), async (req, res) => {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const images = req.files ? req.files.map(f => `${BASE_URL}/uploads/${f.filename}`) :[];
  const product = new Product({
    name: req.body.name,
    // description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    description: req.body.description,
    images: images
  });

  await product.save();
  res.send("Product added");
});

// GET PRODUCTS (USER)
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.put("/edit/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send("Product updated");
});

router.delete("/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product deleted");
});
router.post("/review/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  product.reviews.push({
    user: req.body.user,
    rating: req.body.rating,
    comment: req.body.comment
  });

  await product.save();
  res.send("Review added");
});


module.exports = router;
