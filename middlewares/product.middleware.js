const Product = require("../models/product");

function getProductById(req, res, next) {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (product) res.product = product;
      else res.message = "product not found!";
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "network error! please try again later.",
        method: req.method,
        url: req.originalUrl,
        "error code": err.code,
        "error message": err.message,
      });
    });
}

module.exports = { getProductById };
