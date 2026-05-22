const express = require("express");

const router = express.Router();

const { addNote, getNotes } = require("../Controller/internalNoteController");

router.post("/", addNote);

router.get("/:ticketId", getNotes);

module.exports = router;
