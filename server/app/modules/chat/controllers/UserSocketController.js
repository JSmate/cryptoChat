'use strict';

var redisClient = require('../helpers/Redis.helper');
var config = require('../../../config/config');
var wsEvents = require('../config/ws-events');
var uuid = require('uuid');

class UserSocketController {
    constructor(nsp, socket) {
        this.nsp = nsp;
        this.socket = socket;
        this.addedUser = false;
        this.numUsers = 0;

        this.connection();
    }

    connection() {
        console.log('user connected');
    }

    newMessage(data) {
        // we tell the client to execute 'new message'
        this.socket.to(data.user.socketId).emit(wsEvents.NEW_MESSAGE, {
            username: this.socket.username,
            message: data.message
        });
    }

    addUser(user) {
        if (this.addedUser) return;

        // we store the username in the socket session for this client
        this.socket.username = user.username;

        user.id = uuid.v1();
        user.socketId = this.socket.id;

        this.user = user;

        redisClient.hmset('user:' + user.id, user, (err, res) => {
            redisClient.keys('user:*', (err, userKeys) => {
                var batch = redisClient.batch();

                userKeys.forEach(x => x !== 'user:' + user.id && batch.hgetall(x));

                this.numUsers = userKeys.length;
                this.addedUser = true;
                batch.exec((err, users) => {
                    this.socket.emit(wsEvents.LOGIN, {
                        users: users,
                        numUsers: this.numUsers
                    });
                });
            });


            // echo globally (all clients) that a person has connected
            this.socket.broadcast.emit(wsEvents.USER_JOINED, {
                user: user,
                numUsers: this.numUsers
            });
        });
    }

    typing() {
        this.socket.broadcast.emit(wsEvents.TYPING, {
            username: this.socket.username
        });
    }

    stopTyping() {
        this.socket.broadcast.emit(wsEvents.STOP_TYPING, {
            username: this.socket.username
        });
    }

    disconnect() {
        console.log('user disconnected');
        if (this.addedUser) {
            redisClient.del('user:' + this.user.id, (err, reply) => {
                redisClient.keys('user:*', (err, userKeys) => {
                    this.numUsers = userKeys.length;

                    // echo globally that this client has left
                    this.socket.broadcast.emit(wsEvents.USER_LEFT, {
                        username: this.socket.username,
                        numUsers: this.numUsers
                    });
                });
            });
        }
    }
}

module.exports = UserSocketController;