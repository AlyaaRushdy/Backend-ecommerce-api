const User = require("../models/user");

function checkIfUserExists(req, res, next) {
  if (req.body.email) {
    User.find({ email: req.body.email })
      .then((user) => {
        if (user.length !== 0) {
          return res.status(400).json({
            message: "this email is already registered!",
          });
        } else next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "network error! please try again later.",
          "error code": err.code,
          "error message": err.message,
        });
      });
  } else {
    res.status(400).json({
      message: "please enter a valid email",
    });
  }
}

module.exports = { checkIfUserExists };
