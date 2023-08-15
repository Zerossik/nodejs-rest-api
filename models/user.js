const { Schema, model } = require("mongoose");
const joi = require("joi");

const authSchemaJoi = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  subscription: joi.string(),
});

const authSchemaVerify = joi.object({
  email: joi.string().required(),
});

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  User,
  authSchemaJoi,
  authSchemaVerify,
};
