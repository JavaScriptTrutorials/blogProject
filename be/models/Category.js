const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: [
        {
            type: String,
            
        }
    ],
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' 
        }
    ]
},
{
    timestamps: true
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;