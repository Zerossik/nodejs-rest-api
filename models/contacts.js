const { model, Schema } = require("mongoose");
const joi = require("joi");
const schemaJoi = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});
const schemaJoiUpdateFavorite = joi.object({
  favorite: joi.boolean().required(),
});
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true } // видаляє _V версію та додає час створення та оновлення!
);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemaJoi, schemaJoiUpdateFavorite };
