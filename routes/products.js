const express = require("express"),
  router = express.Router(),
  ProductController = require("../controllers/product.controller"),
  ProductMiddleware = require("../middlewares/product.middleware");

// get
router.get("/", ProductController.index);
router.get("/:id", ProductMiddleware.getProductById, ProductController.show);

// post
router.post("/", ProductController.store);

// patch
router.patch(
  "/:id",
  ProductMiddleware.getProductById,
  ProductController.update
);

// delete
router.delete(
  "/:id",
  ProductMiddleware.getProductById,
  ProductController.destroy
);

module.exports = router;
