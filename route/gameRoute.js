const express = require('express');
const router = express.Router();
const boardController = require('../controller/boardController');
const protect = require('../middleware/authMiddleware');

// Define user routes
router.get('/init',protect, boardController.initGame);
router.post('/makeMove',protect, boardController.move);

module.exports = router;