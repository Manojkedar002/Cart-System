const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
//register User
const registerUserController = async (req, res) => {
  try {
    const { fname, lname, username, email, mobile, password, status } =
      req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "Email already registered.",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    // Create the  user
    const user = await User.create({
      fname,
      lname,
      username,
      email,
      mobile,
      status,
      password: hashpassword,
      createdBy: `${fname} ${lname}`,
    });

    return res.status(201).send({
      success: true,
      message: " user successfully registered.",
      user: { _id: user._id, fname, lname, username, email, mobile, status },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in registerUserController",
    });
  }
};
//login user
const loginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(403).send({
        success: false,
        message: "please provide required field",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ Status: `user credentials are invalid` });
    }
    if (!user.status) {
      return res.status(400).json({ Status: `user is not active` });
    }
    // Generate access token

    const accessToken = jwt.sign(
      { _id: user._id, status: user.status },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_VALIDITY }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { _id: user._id, status: user.status },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_VALIDITY }
    );
    user.refreshToken = refreshToken;
    user.save();
    return res.status(200).send({
      success: true,
      message: "User login successfully",
      adminUser: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        status: user.status,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "error in loginUserController",
    });
  }
};

module.exports = { loginUserController, registerUserController };
