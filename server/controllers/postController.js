const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
const createPost = async (req, res) => {
    const { content, tag } = req.body;

    if (!content) {
        res.status(400);
        throw new Error('Content is required');
    }

    const post = await Post.create({
        content,
        tag: tag || 'thought',
    });

    res.status(201).json(post);
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Public
const likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    post.likes += 1;
    await post.save();

    res.status(200).json(post);
};

// @desc    Vent (Ephemeral)
// @route   POST /api/vent
// @access  Public
const vent = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        res.status(400);
        throw new Error('Message is required to vent');
    }

    // Logic: We explicitly DO NOT save this to the database.
    // It is processed and "released" (deleted/ignored).

    // Optional: Return a supportive AI snippet (simulated for speed/cost)
    const affirmations = [
        "It's gone now. You're lighter.",
        "Released into the void.",
        "Your burden has been acknowledged and destroyed.",
        "Breathe. It's over."
    ];
    const reply = affirmations[Math.floor(Math.random() * affirmations.length)];

    res.status(200).json({
        success: true,
        message: "Vent received and shredded.",
        reply
    });
};

module.exports = {
    getPosts,
    createPost,
    likePost,
    vent,
};
