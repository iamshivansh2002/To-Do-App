const User = require("../models/users");
const jwt = require("jsonwebtoken");

// User signup
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status_code: 400,
        message: "Email already exists. Please sign in.",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const newUser = new User({
      email,
      password,
      otp,
    });

    await newUser.save();

    return res.status(201).json({
      status_code: 201,
      message: "User signed up successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: error.message,
    });
  }
};



// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status_code: 404,
        message: "User not found",
      });
    }

    const isMatch = await user.checkPass(password);

    if (isMatch) {
      const token = jwt.sign(
        {
          data: user._id,
        },
        "secret",
        { expiresIn: "4h" }
      );

      return res.status(200).json({
        status_code: 200,
        message: "User logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        status_code: 401,
        message: "Password doesn't match",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};


const changePassword = async (req, res) => {
  try {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;

    const passwordMatch = await user.checkPass(currentPassword);

    if (!passwordMatch) {
      return res.status(400).json({
        status_code: 400,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status_code: 200,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      message: error.message,
    });
  }
};

const forgotPass = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status_code: 404,
        message: "User doesn't exist",
      });
    }

    user.otp = Math.floor(1000 + Math.random() * 9000);

    await user.save();

    return res.status(200).json({
      status_code: 200,
      otp: user.otp,
      id: user._id,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      message: error.message,
    });
  }
};

const resetPass = async (req, res) => {
  try {
    const { id, otp, password } = req.body;
    const user = await User.findById(id);

    if (user.otp != otp) {
      return res.status(400).json({
        status_code: 400,
        message: "OTP doesn't match",
      });
    }

    user.password = password;
    user.otp = undefined; // Important: User can't reset with the same OTP again
    await user.save();

    return res.status(200).json({
      status_code: 200,
      message: "Password Reset Successful",
    });
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      message: error.message,
    });
  }
};


module.exports = { signup, login, changePassword ,forgotPass,resetPass};



