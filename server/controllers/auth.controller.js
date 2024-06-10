const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
    const { name, password, email, preference } = req.body;
  
    try {
      if (!password) throw new Error("password is required");
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        name,
        password: hashedPassword,
        email,
        preference,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!password || !email)
        throw new Error("email and password is required");
  
      const user = await User.findOne({ email });
      if (!user) res.status(400).json({ message: "user not found" });
  
      const isMatchPass = await bcrypt.compare(password, user.password);
      if (!isMatchPass) res.status(400).json({ message: "invalid password" });
  
    //   if (!process.env.JWT_SECRET) throw new Error("JWT secret is not defined");
  
    //   const token = jwt.sign(
    //     {
    //       id: user._id,
    //       username: user.username,
    //       roles: user.roles,
    //     },
    //     process.env.JWT_SECRET,
    //     { expiresIn: "1h" }
    //   );
  
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  module.exports = { registerUser, loginUser };