const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Get All Products
function register(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  bcrypt.hash(password, 10).then((hashedPassword) => {
    const user = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    user.save().then(() => {
      return res.status(201).json({
        message: "User Registered Successfully",
      });
    });
  });
}

// Get Single Product
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const userByEmail = await User.findOne({ email: email });

  if (!userByEmail)
    return res.status(400).json({
      message: "Wrong email or password",
    });

  bcrypt.compare(password, userByEmail.password).then((isIdentical) => {
    if (isIdentical) {
      return res.status(200).json({
        message: "You're now logged in",
      });
    } else {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    }
  });
}

module.exports = {
  register,
  login,
};
