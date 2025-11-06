const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth.routes');
const tasksRoutes = require('./routes/tasks.routes');
const { startReminderJob } = require('./jobs/reminder.job');

async function start() {
    await mongoose.connect(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/tasks', tasksRoutes);

    app.get('/', (req, res) => res.send('Todo App API'));

    app.listen(config.port, () => {
        console.log(`Server listening on http://localhost:${config.port}`);
    });

    // start background job
    startReminderJob();
}

start().catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
});
