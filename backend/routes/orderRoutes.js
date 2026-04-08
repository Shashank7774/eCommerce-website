const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

router.post("/place", async (req, res) => {
  try {
    const {
      userId,
      cart,
      deliveryDetails,
      paymentMethod
    } = req.body;

    let total = 0;

    const products = cart.map(p => {
      total += p.price * p.qty;
      return {
        productId: p._id,
        name: p.name,
        price: p.price,
        qty: p.qty,
        image: p.images?.[0]
      };
    });

    const order = new Order({
      userId,
      products,
      deliveryDetails,
      paymentMethod,
      totalAmount: total
    });

    await order.save();

    res.json({ success: true });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed" });
  }
});


router.get("/details/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({createdAt: -1});
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/admin/all", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").sort({createdAt: -1});
    res.json(orders);
  }catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   const orders = await Order.find({ userId: req.params.userId });
//   res.json(orders);
// });
router.put("/cancel/:orderId", async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order.status !== "Placed") {
    return res.status(400).json({ message: "Order cannot be cancelled" });
  }

  order.status = "Cancelled";
  await order.save();

  res.json({ message: "Order cancelled" });
});

router.put("/return/:orderId", async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order.status !== "Delivered") {
    return res.status(400).json({ message: "Order cannot be returned" });
  }

  order.status = "Returned";
  await order.save();

  res.json({ message: "Return requested" });
});


router.put("/status/:id", async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.send("Order status updated");
});

// ADMIN: Update order status
router.put("/update-status/:orderId", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});




module.exports = router;
