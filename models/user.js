const { Schema, model } = require("mongoose");
const joi = require("joi");

const authSchemaJoi = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  subscription: joi.string(),
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
    avatarURL: {
      type: String,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  User,
  authSchemaJoi,
};
