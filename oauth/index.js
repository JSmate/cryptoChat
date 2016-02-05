var express = require('express'),
    bodyParser = require('body-parser'),
    oauthserver = require('oauth2-server');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var memorystore = require('./model.js');

app.oauth = oauthserver({
    model: memorystore,
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
