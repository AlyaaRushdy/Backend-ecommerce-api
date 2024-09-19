const express = require("express"),
  router = express.Router(),
  UserController = require("../controllers/user.controller"),
  { checkIfUserExists } = require("../middlewares/user.middleware");

router.post("/register", checkIfUserExists, UserController.register);
router.post("/login", UserController.login);

module.exports = router;
