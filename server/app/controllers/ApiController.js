'use strict';

var projectPackage = require('../../package.json');
var wsEvents = require('../modules/chat/config/ws-events');

class ApiController {
    index(req, res) {
        res.json({version: projectPackage.version});
    }

    events (req, res) {
        res.json(wsEvents);
    }
}


module.exports = ApiController;