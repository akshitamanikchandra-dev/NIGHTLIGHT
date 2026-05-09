const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');
const asyncHandler = require('express-async-handler'); // Simple way to handle async errors

router.post('/', asyncHandler(handleChat));

module.exports = router;
