var router = require('express').Router();

var ApiController = require('./controllers/ApiController');

var api = new ApiController();

router.all('/api', api.index.bind(api));

router.get('/api/events', api.events.bind(api));

module.exports = router;