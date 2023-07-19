const reqError = require("../helpers/reqError.js");
const joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts.js");
const decorator = require("../decorators/controller-decorator.js");
const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const getAll = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw reqError(404, "NotFound");
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw reqError(400, "missing required name field");
  }
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) throw reqError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const { error } = schema.validate(req.body);
  const result = await updateContact(contactId, req.body);
  if (error) {
    throw reqError(400, "missing fields");
  } else if (!result) {
    throw reqError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: decorator(getAll),
  getById: decorator(getById),
  postContact: decorator(postContact),
  deleteContact: decorator(deleteContact),
  update: decorator(update),
};
