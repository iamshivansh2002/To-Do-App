const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      maxLength: 50,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
