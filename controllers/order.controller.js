const Order = require("../models/order"),
  Product = require("../models/product");

function index(req, res) {
  Order.find({})
    .populate("product", "name price")
    .then((orders) => {
      if (orders.length == 0)
        res.status(404).json({
          message: "No Orders Yet",
        });
      else {
        res.status(200).json({
          message: "Orders Retrieved Successfully",
          totalOrders: orders.length,
          orders: orders.map((order) => {
            return {
              orderId: order._id,
              productName: order.product.name,
              productPrice: order.product.price,
              quantity: order.quantity,
            };
          }),
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error! please try again later",
        errorCode: error.code,
        errorMessage: error.message,
      });
    });
}

function store(req, res) {
  Product.findById(req.body.id).then((product) => {
    if (product) {
      const order = new Order({
        quantity: req.body.quantity,
        product: req.body.id,
      });

      order.save().then((order) => {
        res.status(201).json({
          message: "order created successfully!",
          order: order,
        });
      });
    } else {
      res.status(404).json({
        message: "order not found!",
      });
    }
  });
}

module.exports = {
  index,
  store,
};
