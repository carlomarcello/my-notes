const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PropertiesReader = require('properties-reader');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const noteRoutes = require('./routes/note');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');

const isAuth = require('./middleware/is-auth');
const error = require('./middleware/error');
// End of imports

const properties = PropertiesReader('secure.properties');
const mongodbUser = properties.get('mongodb.user');
const mongodbPassword = properties.get('mongodb.password');
const sessionSecret = properties.get('session.secret');

const MONGODB_URI = `mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0-dunki.mongodb.net/mynotes`;

// Session store
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Set middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: sessionSecret, 
    resave: false, 
    saveUninitialized: false, 
    store: store})
);

app.use((req, res, next) => {
    User.findById('5c50d6898e17092dd83250c3')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;    
    next();
});

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/note', noteRoutes);
app.use('/category', categoryRoutes);
app.use('/', isAuth, (req, res, next) => {
    return res.render('index', {
        pageTitle: 'Início',
        path: 'index'
    });
});
app.use(error);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const password = 'admin123';
                return bcrypt
                    .hash(password, 12)
                        .then(hashedPassword => {
                            const user = new User({
                                username: 'Admin',
                                email: 'admin@mynotes.com',
                                password: hashedPassword
                            });
                            user.save();
                        });                        
            }
            app.listen(3000);
        });
    })
    .catch(err => {
        console.log(err);
    });

//


