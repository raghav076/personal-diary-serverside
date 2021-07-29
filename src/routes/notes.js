const express = require("express");
const { addNote, getAllNotes } = require("../controller/notes");
const { requireSignin } = require("../common-middleware");

const router = express.Router();

router.post("/notes/addNote", requireSignin, addNote);
router.get("/notes/getAllNotes", requireSignin, getAllNotes);

module.exports = router;
