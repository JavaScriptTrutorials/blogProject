const Category = require("../models/Category");
const mongoose = require('mongoose');

module.exports.category_get_all = async(req, res) => {
    console.log("som tu");
    try{
        const categories = await Category.find().populate({
            path: 'creator',
            model: 'user'
        }).populate({
            path: 'subcategories',
            model: 'category'
        });

        res.status(201).json({categories});

    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};

module.exports.create_post = async(req, res) => {
    const {name, parentCategory} = req.body;
    const userId = res.locals.userId;

    console.log(userId);
    console.log(mongoose.Types.ObjectId(userId));
    try{
        let parentObject = null;

        const category = new Category({
            name,
            creator: mongoose.Types.ObjectId(userId),
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