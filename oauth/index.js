var express = require('express'),
    bodyParser = require('body-parser'),
    oauthserver = require('oauth2-server');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var mongoose = require('mongoose');

var uristring = 'mongodb://secure-chat:Bq9a4LzSRc4p04g@ds055915.mongolab.com:55915/secure-chat';

// Makes connection asynchronously. Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var mongoStore = require('./mongo-model');

app.oauth = oauthserver({
    model: mongoStore,
    grants: ['password','refresh_token'],
    debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
    res.send('Secret area');
});

app.use(app.oauth.errorHandler());

app.listen(3001);

console.info('running at port 3001');
