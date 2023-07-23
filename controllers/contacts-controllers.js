const {
  Contact,
  schemaJoi,
  schemaJoiUpdateFavorite,
} = require("../models/contacts.js");
const reqError = require("../helpers/reqError.js");
const decorator = require("../decorators/controller-decorator.js");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw reqError(404, "NotFound");
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const { error } = schemaJoi.validate(req.body);
  if (error) {
    throw reqError(400, "missing required name field");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) throw reqError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const { error } = schemaJoi.validate(req.body);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (error) {
    throw reqError(400, "missing fields");
  } else if (!result) {
    throw reqError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { error } = schemaJoiUpdateFavorite.validate(req.body);
  if (error) {
    throw reqError(400, "missing fields favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw reqError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAll: decorator(getAll),
  getById: decorator(getById),
  postContact: decorator(postContact),
  deleteContact: decorator(deleteContact),
  update: decorator(update),
  updateFavorite: decorator(updateFavorite),
};
