const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
    tag: {
        type: String,
        enum: ['thought', 'vent', 'mood', 'love'],
        default: 'thought',
    },
    likes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);
