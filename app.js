let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

/**
 * DB setting
 * */
// mongodb connect
let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = global.Promise;

// DB collection: create secondhandshop collection and connect
let databaseUrl = 'mongodb://localhost:27017/secondhandshop';
let connect = mongoose.connect(databaseUrl,
    { useMongoClient: true }
);
// automatically increase primary key
autoIncrement.initialize(connect);

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('mongodb connection success!');
});

let app = express();
let port = 3000;        // port number

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware setting
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Router
let adminRouter = require('./routes/admin');

// Routing
app.use('/admin', adminRouter);

app.get('/', function (req, res) {
    res.send('It is working');
});

// connect to server port
app.listen(port, function () {
    console.log('Express Server listening on port: ' + port + ' is now running.');
});

