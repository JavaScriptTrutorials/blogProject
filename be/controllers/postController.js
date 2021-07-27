const Post = require('../models/Post');
const Category = require('../models/Category');
const {deleteAllComments} = require('./commentController');

module.exports.post_update = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await Post.findByIdAndUpdate(id, req.body, {useFindAndModify: false});
        res.json(data);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.deleteAllPosts = posts => {

    posts.forEach(async post => {
        const removedPost = await Post.findByIdAndDelete(post);
        console.log(deleteAllComments);
        deleteAllComments(removedPost.comments);
    });
}

module.exports.post_delete = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await Post.findByIdAndDelete(id);
        console.log(data);
        deleteAllComments(data.comments);
        // remove post from category posts array
        await Category.findByIdAndUpdate(data.categoryParent , {$pull: {"posts": data._id}}, {useFindAndModify: false});

        res.json(data);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.posts_get = async (req, res) => {
    try{
        const posts = await Post.find();

        res.status(201).json({posts});

    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.post_create = async(req, res) => {
    const {title, content, categoryParent} = req.body;
    const userId = res.locals.user.id;
    console.log(req.body);
    console.log(userId);
    try{
        const post = new Post({
            title,
            content,
            categoryParent,
            creator: userId
            //categoryParent: mongoose.Types.ObjectId(categoryParent),
            //creator: mongoose.Types.ObjectId(userId)
        });
        console.log(">>>>>", post);
        await Category.findByIdAndUpdate(categoryParent, {$push: {"posts": post._id}}, {useFindAndModify: false});
        await post.save();
     
        res.status(201).json({post});
    } catch(err){
        console.log(err);
        res.status(400).json({err});
    }
};