const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err)
);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));


app.listen(5000, () => console.log("Backend running"));
