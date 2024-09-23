//imports
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const protect = async (req, res, next) => {
    let token;

    // Check if the token is provided in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by decoded token ID and add to request
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized' });
    }
};

module.exports = protect;
