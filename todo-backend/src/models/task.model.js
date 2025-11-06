const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueAt: { type: Date },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    tags: [String],
    reminderSent: { type: Boolean, default: false }
}, { timestamps: true });

taskSchema.index({ userId: 1, dueAt: 1 });

module.exports = mongoose.model('Task', taskSchema);
