
const Category = require('../models/category.js');

exports.getAddCategory = (req, res, next) => {

    res.render('category/add-category', {
        pageTitle: 'Add Category',
        path: '/category/add-category',        
        editing: false
    });
};

exports.postAddCategory = (req, res, next) => {
    const name = req.body.name;
    
    const category = new Category({
        name: name
    });

    category.save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });    
};

exports.getCategories = (req, res, next) => {
    Category.find()
        .then(categories => {
            res.render('category/categories', {
                pageTitle: 'All Categories',
                path: '/category/categories',
                categories: categories
            });
        })
        .catch(err => {
            console.log(err);
        });
};