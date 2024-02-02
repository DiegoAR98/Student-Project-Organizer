// app/controllers/mainController.js

exports.showMainPage = (req, res) => {
    res.render('home', {
        layout: 'main',
        pageTitle: 'Home Page',
        // Any other dynamic data you want to pass to the template
    });
};
