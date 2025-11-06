const express = require('express');
const router = express.Router();
const tasks = require('../controllers/tasks.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', tasks.listTasks);
router.post('/', tasks.createTask);
router.get('/:id', tasks.getTask);
router.put('/:id', tasks.updateTask);
router.delete('/:id', tasks.deleteTask);

module.exports = router;
