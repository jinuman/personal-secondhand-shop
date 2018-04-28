const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

/**
 * DB setting
 * */
// mongodb connect
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

// Database: create secondhandshop database and connect
const databaseUrl = 'mongodb://localhost:27017/secondhandshop';
const connect = mongoose.connect(databaseUrl,
    { useMongoClient: true }
);
// automatically increase primary key
autoIncrement.initialize(connect);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('mongodb connection success!');
});

const app = express();
const port = 3000;        // port number

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware setting
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Router
const adminRouter = require('./routes/admin');

// Routing
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Happy jinuman');
});

// connect to server port
app.listen(port, () => {
    console.log('Express Server listening on port: ' + port + ' is now running.');
});

