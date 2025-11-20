const bcrypt = require("bcrypt");
const User = require("../../model/user");
const jwt= require('jsonwebtoken');
const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        data: null,
      });
    }

        const user = await User.findOne({ email });


    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        data: null,
      });
    }
     const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.TOKEN,      
      { expiresIn: "7d" }      
    );

    return res.status(200).json({
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = login;
