//imports
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const protect = require('../middleware/authMiddleware');

// PROTECTED
router.get('/',protect, userController.getAllUsers);
router.get('/:id',protect, userController.getUserById);

module.exports = router;
