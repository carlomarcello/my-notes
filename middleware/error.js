module.exports = (req, res, next) => {
    res.render('error/404', {
        pageTitle: 'Page not found =(',
        path: '/error/404'
    });
}