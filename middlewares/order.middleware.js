const Order = require("../models/order");

function getOrderById(req, res, next) {
  const { id } = req.params;
  Order.findById(id)
    .populate("product", "name price")
    .then((order) => {
      if (order) {
        res.order = {
          orderId: order.id,
          productName: order.product.name,
          productPrice: order.product.price,
          quantity: order.quantity,
        };
      } else res.message = "order not found!";
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "network error! please try again later.",
        "error code": err.code,
        "error message": err.message,
      });
    });
}

module.exports = { getOrderById };
