const Task = require('../models/task.model');

async function listTasks(req, res) {
    const tasks = await Task.find({ userId: req.user._id }).sort({ dueAt: 1, createdAt: -1 });
    res.json(tasks);
}

async function getTask(req, res) {
    const t = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json(t);
}

async function createTask(req, res) {
    const payload = {
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description,
        dueAt: req.body.dueAt ? new Date(req.body.dueAt) : undefined,
        priority: req.body.priority,
        tags: req.body.tags || []
    };
    const task = await Task.create(payload);
    res.status(201).json(task);
}

async function updateTask(req, res) {
    const updates = req.body;
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        updates,
        { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
}

async function deleteTask(req, res) {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
