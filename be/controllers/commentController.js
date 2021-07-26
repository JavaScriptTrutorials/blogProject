const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

module.exports.comment_update = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await Comment.findByIdAndUpdate(id, req.body, {useFindAndModify: false});
        res.json(data);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.comment_delete = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await Comment.findByIdAndDelete(id);
        if(data.commentParent === null || data.commentParent === undefined){
            await Post.findByIdAndUpdate(data.forPost, {$pull: {"comments": data._id}}, {useFindAndModify: false});
        } else {
            await Comment.findByIdAndUpdate(data.commentParent, {$pull: {"subcomments": data._id}}, {useFindAndModify: false});
        }
        // todo delete nested comments
        res.json(data);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.subcomments_get = async (req, res) => {
    const id = req.params.id;
    try{
        const comment = await Comment.findById(id).populate({
            path: 'subcomments',
            model: 'comment'
        });
        res.json(comment.subcomments);

    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.comment_get = async (req, res) => {
    const id = req.params.id;
    try{
        const comment = await Comment.findById(id);
        res.json(comment);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.comments_get = async (req, res) => {
    try{
        const comments = await Comment.find();

        res.status(201).json({comments});

    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.comment_create = async(req, res) => {
    const {text, commentParent, forPost} = req.body;
    const userId = res.locals.user.id;
    console.log(req.body, forPost);
    try{
        const comment = new Comment({
            text,
            commentParent,
            creator: userId,
            forPost
        });
        if(!(commentParent === null || commentParent === undefined)){
            await Comment.findByIdAndUpdate(commentParent, {$push: {"subcomments": comment._id}}, {useFindAndModify: false});
        } else {
            await Post.findByIdAndUpdate(forPost, {$push: {"comments": comment._id}}, {useFindAndModify: false});
        }
        await comment.save();
     
        res.status(201).json({comment});
    } catch(err){
        console.log(err);
        res.status(400).json({err});
    }
};