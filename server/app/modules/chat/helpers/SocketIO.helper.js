var config = require('../../../config/config');

var io;

exports.init = http => {
    var redis = require('socket.io-redis');
    io = require('socket.io')(http);
    io.adapter(redis(config.redis));
};

exports.instance = () => {
    if(!io) {
        throw new Error('SocketIO was not initialized!');
    }

    return io;
};