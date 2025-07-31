import mongoose, { Schema, models } from 'mongoose';

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export const Note = models.Note || mongoose.model('Note', NoteSchema);
