const { catchAsyncErros } = require("../middlewares/catchAsyncErrors");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.homepage = catchAsyncErros(async (req, res, next) => {
  res.json({ message: "homepage" });
});

//register new user route
exports.signup = catchAsyncErros(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await user.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
});

//Login route
exports.login = catchAsyncErros(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const foundedUser = await user.findOne({ email });

    if (!foundedUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      foundedUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { foundedUserId: foundedUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE, // Token expiration time
      }
    );
    res.header("Authorization", `${token}`);
    res.json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//reset password route need more work to be done
exports.resetPassword = catchAsyncErros(async (req, res, next) => {
  const otp = Math.floor(Math.random() * 1000000);
  const foundedUser = await user.findOneAndUpdate(
    { email: req.query.email },
    { $set: { otp: otp } },
    { new: true }
  );

  res.json({
    otp: otp,
  });
});

//Get current user
exports.getUser = catchAsyncErros(async (req, res, next) => {
  try {
    const foundedUser = await user.findById(req.user.foundedUserId);
    res.json({
      user: foundedUser,
    });
  } catch (error) {
    next(error);
  }
});
