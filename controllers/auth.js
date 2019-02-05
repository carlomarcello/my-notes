// const Product = require('../models/product');

exports.getLogin = (req, res, next) => {
	console.log(req.session.isLoggedIn);
	console.log(req.session);
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login'
	});
};

exports.postLogin = (req, res, next) => {
	req.session.isLoggedIn = true;
	res.redirect('/');
}
