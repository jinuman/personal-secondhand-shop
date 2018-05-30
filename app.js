const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
// req.body를 자동으로 추가해주는 모듈. routes 단에서 사용
const cookieParser = require('cookie-parser');
// req.cookie를 자동으로 추가해주는 모듈. routes 단에서 사용

/** DB setting */
// mongodb connect
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// Database: create secondhandshop database and connect
const databaseUrl = 'mongodb://localhost:27017/secondhandshop';
const connect = mongoose.connect(databaseUrl,
    {useMongoClient: true}
);
// automatically increase primary key
autoIncrement.initialize(connect);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('mongodb connection success!');
});

// Router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware setting
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
