const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      
    },
  
   
    password: {
      type: String,
      required: true,
    },
   
    otp: {
      type: String,
    },
   
    
  },
  { timestamps: true }
);


////PASSWORD HASING USING BCRYPT----------------------------------------------------------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});




//METHOD----------------------------------------------
userSchema.methods.checkPass = async function (givenpassword) {
  return await bcrypt.compare(givenpassword, this.password);
};



const User = new mongoose.model("User", userSchema, "users");
module.exports = User;
