const jwt = require("jsonwebtoken");
const User = require("../models/users");

const validate = async (req, res, next) => {
  try {
    console.log("validate");
    const token = req.headers.authorization;
    if (!token) {
      return res.json({ message: "Token not found" });
    }

    const id = jwt.verify(token, "secret");
    if (id) {
      const user = await User.findById(id.data);
      req.user = user;
      next();
    } else if (!id) {
      return res.json({ message: "Session Expired" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = validate;  
