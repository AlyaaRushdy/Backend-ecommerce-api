const express = require("express"),
  router = express.Router(),
  OrderController = require("../controllers/order.controller"),
  { getOrderById } = require("../middlewares/order.middleware");

// get
router.get("/", OrderController.index);
router.get("/:id", getOrderById, OrderController.show);

// post
router.post("/", OrderController.store);

// delete
router.delete("/:id", getOrderById, OrderController.destroy);

module.exports = router;
