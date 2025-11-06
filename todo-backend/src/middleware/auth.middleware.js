const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.model');

async function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing authorization token' });
    }
    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(payload.sub).select('-passwordHash');
        if (!user) return res.status(401).json({ message: 'Invalid token (user not found)' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;
