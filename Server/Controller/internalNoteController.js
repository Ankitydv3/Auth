const InternalNote = require("../Models/InternalNote");

exports.addNote = async (req, res) => {
  try {
    const { ticketId, note } = req.body;

    const newNote = await InternalNote.create({
      ticketId,
      adminId: req.user?.id,
      note,
    });

    res.status(201).json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await InternalNote.find({
      ticketId: req.params.ticketId,
    }).populate("adminId", "name email");

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
