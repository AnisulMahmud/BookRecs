const bcrypt = require("bcrypt");
const User = require("../models/user.model");
import generateTokenAndSetCookie from "../utils/generateToken";

const registerUser = async (req, res) => {
  const { name, password, email, preference } = req.body;

  try {
    if (!password) throw new Error("password is required");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
      preference,
    });

    if (newUser) {
      await generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        preference: newUser.preference,
      });
    } else {
      res.status(400).json({ message: "User not Created" });
    }
  } catch (error) {
    console.log("error in registerUser in authController", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!password || !email) throw new Error("email and password is required");

    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "user not found" });

    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) res.status(400).json({ message: "invalid password" });

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      preference: user.preference,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// logout
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log("error in logoutUser in authController", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
