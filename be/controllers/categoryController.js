const Category = require("../models/Category");
const {deleteAllPosts} = require("./postController");
const mongoose = require('mongoose');

module.exports.category_update = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await Category.findByIdAndUpdate(id, req.body, {useFindAndModify: false});
        res.json(data);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

const deleteSubcategories = async category => {
    console.log(category);
    // removing post of the category
    deleteAllPosts(category.posts);
    // removing subcategories
    while(category.subcategories.length !== 0){
        const subcategory = await(Category.findByIdAndDelete(category.subcategories.pop()));

        deleteSubcategories(subcategory);
    }
};

module.exports.category_delete = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await Category.findByIdAndDelete(id);
        // remove category from parent array of childrens
        if(data.parentCategory !== null){
            await Category.findByIdAndUpdate(data.parentCategory , {$pull: {"subcategories": data._id}}, {useFindAndModify: false});
        }
        // todo also delete subcategories, posts & comments
        deleteSubcategories(data);

        res.json(data);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports.get_categoryBiId = async(req, res) => {
    const id = req.params.id;
    try{
        const data = await Category.findById(id);
        res.json({data});
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
};

module.exports.category_get_all = async(req, res) => {
    try{
        const categories = await Category.find();/*.populate({
            path: 'creator',
            model: 'user'
        }).populate({
            path: 'subcategories',
            model: 'category'
        });*/

        res.status(201).json({categories});

    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};

module.exports.create_post = async(req, res) => {
    const {name, parentCategory} = req.body;
    const userId = res.locals.user.id;

    console.log(userId);
    console.log(mongoose.Types.ObjectId(userId));
    try{
        let parentObject = null;

        const category = new Category({
            name,
            creator: userId,
        });

        console.log('$$$$', parentCategory);

        if(!(parentCategory === null || parentCategory === undefined)){
            parentObject = mongoose.Types.ObjectId(parentCategory);
            category.parentCategory = parentObject;

            await Category.findByIdAndUpdate(parentCategory, {$push: {"subcategories": category._id}}, {useFindAndModify: false});
        }
        await category.save();
        
     
        res.status(201).json({category});
    } catch(err){
        res.status(400).json(err);
    }
};