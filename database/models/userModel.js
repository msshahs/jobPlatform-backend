const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    linkedinUrl: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['employee', 'employer'],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("LinkedInUser", userSchema);

module.exports = UserModel;
