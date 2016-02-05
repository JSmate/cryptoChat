var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//init socket io instance, in order to use it across the application
require('./modules/chat/helpers/SocketIO.helper').init(http);

var config = require('./config/config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/../../client'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('./middlewares/CorsMiddleware'));

app.use(require('./router'));

//modules
app.use(require('./modules/chat'));

app.use('/api', require('./middlewares/ErrorMiddleware'));

module.exports = http;