const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PropertiesReader = require('properties-reader');

const User = require('./models/user');

// const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5c50d6898e17092dd83250c3')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

const adminRoutes = require('./routes/admin');
const noteRoutes = require('./routes/note');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');

app.use('/admin', adminRoutes);
app.use('/note', noteRoutes);
app.use('/category', categoryRoutes);
app.use(authRoutes);

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
        User.findOne().then(user => {
            if (!user) {
              const user = new User({
                name: 'Carlo',
                email: 'carlo@test.com'
              });
              user.save();
            }
        });

        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

//app.use(errorController.get404);


