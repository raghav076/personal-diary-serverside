const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    notes: [
      {
        heading: {
          type: String,
          required: true,
          trim: true,
        },
        summary: {
          type: String,
          trim: true,
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", notesSchema);
