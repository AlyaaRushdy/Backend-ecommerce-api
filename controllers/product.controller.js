const Product = require("../models/product");

// Get All Products
function index(req, res) {
  Product.find({})
    .then((products) => {
      if (products.length > 0) {
        res.status(200).json({
          message: "products retrieved successfully!",
          method: req.method,
          url: req.originalUrl,
          products: products,
        });
      } else {
        res.status(404).json({
          message: "No Products Yet!",
          method: req.method,
          url: req.originalUrl,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        method: req.method,
        url: req.originalUrl,
        "error code": err.code,
        "error message": err.message,
      });
    });
}

// Get Single Product
function show(req, res) {
  if (res.product) {
    res.status(200).json({
      message: "product retrieved successfully!",
      method: req.method,
      url: req.originalUrl,
      product: res.product,
    });
  } else {
    res.status(404).json({
      message: res.message,
      method: req.method,
      url: req.originalUrl,
    });
  }
}

// Add New Product
function store(req, res) {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    vendor: req.body.vendor,
  });

  product
    .save()
    .then((product) => {
      res.status(201).json({
        message: "product saved successfully!",
        method: req.method,
        url: req.originalUrl,
        product: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "server error",
        method: req.method,
        url: req.originalUrl,
        "error code": err.code,
        "error message": err.message,
      });
    });
}

// Update One Product => PATCH
function update(req, res) {
  if (res.product) {
    const product = {
      name: "",
      price: 0,
      vendor: "",
      category: "",
    };

    for (const key in product) {
      if (req.body[key]) {
        product[key] = req.body[key];
      } else {
        product[key] = res.product[key];
      }
    }

    Product.updateOne(res.product, product, { new: true }).then(() => {
      res.status(200).json({
        message: "product updated successfully!",
        method: req.method,
        url: req.originalUrl,
        product: product,
      });
    });
  } else {
    res.status(404).json({
      message: res.message,
      method: req.method,
      url: req.originalUrl,
    });
  }
}

// // Replace => PUT
// function replace(req, res) {}

// Delete Product
/**  the product is passed from the middleware and the middleware handles
 * the errors of finding the product, what errors might arise when deleting that
 * requires a catch?
 */
function destroy(req, res) {
  if (res.product) {
    Product.deleteOne(res.product).then(() => {
      res.status(200).json({
        message: "product deleted successfully!",
        method: req.method,
        url: req.originalUrl,
        deletedProduct: res.product,
      });
    });
    //   .catch((err) => {
    //     res.status(500).json({
    //       message: "server error",
    //       method: req.method,
    //       url: req.originalUrl,
    //       "error code": err.code,
    //       "error message": err.message,
    //     });
    //   });
  } else {
    res.status(404).json({
      message: res.message,
      method: req.method,
      url: req.originalUrl,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
