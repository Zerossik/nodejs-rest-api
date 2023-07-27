const express = require("express");
const isValidId = require("../../middleware/isValidId.js");
const {
  getAll,
  getById,
  postContact,
  deleteContact,
  update,
  updateFavorite,
} = require("../../controllers/contacts-controllers.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", postContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, update);
router.patch("/:contactId/favorite", isValidId, updateFavorite);

module.exports = router;
