import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const notesModel = mongoose.model('notes');

export default notesModel;
