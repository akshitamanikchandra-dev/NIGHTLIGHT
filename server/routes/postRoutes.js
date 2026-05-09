const express = require('express');
const router = express.Router();
const { getPosts, createPost, likePost, vent } = require('../controllers/postController');
const asyncHandler = require('express-async-handler');

// Wall Routes
router.route('/posts')
    .get(asyncHandler(getPosts))
    .post(asyncHandler(createPost));

router.put('/posts/:id/like', asyncHandler(likePost));

// Vent Route
router.post('/vent', asyncHandler(vent));

module.exports = router;
