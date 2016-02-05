'use strict';

var config = require('../../../config/config');
var redis = require('redis');

var client = redis.createClient(config.redis);

module.exports = client;