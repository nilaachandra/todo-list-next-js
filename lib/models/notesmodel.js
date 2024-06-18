import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  myNotes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NotesModel = mongoose.models.Notes || mongoose.model("Notes", NotesSchema);

export default NotesModel;
