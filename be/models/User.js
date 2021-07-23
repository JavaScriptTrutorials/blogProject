const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        uniquie: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    follows: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

const User = mongoose.model('user', userSchema);

module.exports = User;