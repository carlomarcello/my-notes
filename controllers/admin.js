// const Product = require('../models/product');

exports.getAddUser = (req, res, next) => {
	res.render('admin/add-user', {
		pageTitle: 'Add User',
		path: '/admin/add-user',
		editing: false
	});
};
