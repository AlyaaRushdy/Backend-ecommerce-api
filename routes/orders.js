const express = require("express"),
  router = express.Router(),
  OrderController = require("../controllers/order.controller");

// get
router.get("/", OrderController.index);
// router.get("/:id", OrderController.show);

// post
router.post("/", OrderController.store);

// // put
// router.put("/:id", OrderController.replace);

// // patch
// router.patch("/:id", OrderController.update);

// // delete
// router.delete("/:id", OrderController.destroy);

module.exports = router;
