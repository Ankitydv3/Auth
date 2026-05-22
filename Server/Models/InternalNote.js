const mongoose = require("mongoose");

const internalNoteSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("InternalNote", internalNoteSchema);
