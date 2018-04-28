let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');

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

