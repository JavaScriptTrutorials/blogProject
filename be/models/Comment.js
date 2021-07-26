const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    forPost:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required: true
    },
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    votes: Number,
    commentParent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    subcomments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' 
        }
    ]
},
{
    timestamps: true
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;