const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PropertiesReader = require('properties-reader');

// const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5baa2528563f16379fc8a610')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

const adminRoutes = require('./routes/admin');
const noteRoutes = require('./routes/note');
const categoryRoutes = require('./routes/category');

app.use('/admin', adminRoutes);
app.use('/note', noteRoutes);
app.use('/category', categoryRoutes);

app.use('/', (req, res, next) => {
    res.render('index', {
        pageTitle: 'Index',
        path: '/'
    });
});


const properties = PropertiesReader('secure.properties');
mongodbUser = properties.get('mongodb.user');
mongodbPassword = properties.get('mongodb.password');

mongoose.connect(`mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0-dunki.mongodb.net/mynotes?retryWrites=true`, { useNewUrlParser: true })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

//app.use(errorController.get404);


