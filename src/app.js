const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://localhost/eoslogs')
    .then(db => console.log('Db Connected'))
    .catch(err => console.log(err));


// Import routes
const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', indexRoutes);

// Starting Server
app.listen(app.get('port'), () => {
   console.log(`Listening on port ${app.get('port')}`)
});