const express = require("express");
const {
  getUserController,
  updateUserController,
} = require("../controllers/userController");
const userAuthForCart = require("../middleware/userAuthForCart");
const router = express.Router();

router.get("/getuser", userAuthForCart, getUserController);
router.put("/updateuser", userAuthForCart, updateUserController);

module.exports = router;
