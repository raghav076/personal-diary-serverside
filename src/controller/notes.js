const Notes = require("../models/notes");

exports.addNote = (req, res) => {
  Notes.findOne({ user: req.user._id }).exec((err, note) => {
    if (err) return res.status(400).json({ error: err });
    if (note) {
      let condition, action;
      condition = { _id: note._id };
      action = {
        $push: {
          notes: req.body.newNote,
        },
      };
      Notes.findOneAndUpdate(condition, action).exec((err, _note) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        if (_note) {
          return res.status(200).json({
            message: "new note added successfully",
          });
        } else {
          return res
            .status(400)
            .json({ error: "there is some prolem in adding note" });
        }
      });
    } else {
      console.log(req.body);
      const note = new Notes({
        user: req.user._id,
        notes: req.body.newNote,
      });

      note.save((err, notes) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        if (notes) {
          return res.status(200).json({ notes });
        }
      });
    }
  });
};

exports.getAllNotes = (req, res) => {
  Notes.findOne({ user: req.user._id }).exec((err, notes) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    if (notes) {
      console.log(notes);
      return res.status(200).json({ data: notes.notes, message: "" });
    } else res.status(200).json({ message: "no notes found", data: [] });
  });
};
