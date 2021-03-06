const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    views: Number,
    votes: Number,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    status: {
        type: Boolean,
        default: true,
    },
    categoryParent: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' 
        }
    ]
},
{
    timestamps: true
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;