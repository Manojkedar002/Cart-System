const { User } = require("../models/User");

const updateUserController = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user }, req.body, {
      new: true,
    });

    return res.status(201).send({
      success: true,
      message: "user succesfully updated",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in updateUserController",
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    return res.status(201).send({
      success: true,
      message: "view user succesfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in getUserController",
    });
  }
};

module.exports = { updateUserController, getUserController };
