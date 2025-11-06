const cron = require('node-cron');
const Task = require('../models/task.model');
const config = require('../config');

function startReminderJob() {
    // Run every minute
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const windowEnd = new Date(now.getTime() + config.reminderMinutes * 60 * 1000);

            const tasks = await Task.find({
                dueAt: { $exists: true, $ne: null, $lte: windowEnd, $gt: now },
                completed: false,
                reminderSent: false
            }).populate('userId', 'email name');

            for (const t of tasks) {
                const user = t.userId;
                const subject = `Reminder: ${t.title} is due at ${t.dueAt.toISOString()}`;
                const body = `Hi ${user.name || user.email},\n\nThis is a reminder that your task "${t.title}" is due at ${t.dueAt.toLocaleString()}.\n\nDescription: ${t.description || '(none)'}\n\n-- Todo App`;
                console.log('---[SIMULATED EMAIL]---');
                console.log(`To: ${user.email}`);
                console.log(`Subject: ${subject}`);
                console.log(body);
                console.log('---[END EMAIL]---');

                t.reminderSent = true;
                await t.save();
            }
        } catch (err) {
            console.error('Reminder job error:', err);
        }
    });
}

module.exports = { startReminderJob };
