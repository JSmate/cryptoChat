'use strict';

var redisClient = require('../helpers/Redis.helper');
var config = require('../../../config/config');
var wsEvents = require('../config/ws-events');
var uuid = require('node-uuid');

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
        this.socket.broadcast.emit(wsEvents.NEW_MESSAGE, {
            username: this.socket.username,
            message: data
        });
    }

    addUser(username) {
        if (this.addedUser) return;

        // we store the username in the socket session for this client
        this.socket.username = username;

        redisClient.incr('users', (err, reply) => {
            this.numUsers = reply;
            this.addedUser = true;
            this.socket.emit(wsEvents.LOGIN, {
                numUsers: this.numUsers
            });
            // echo globally (all clients) that a person has connected
            this.socket.broadcast.emit(wsEvents.USER_JOINED, {
                username: this.socket.username,
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
        if (this.addedUser) {
            redisClient.decr('users', (err, reply) => {
                this.numUsers = reply;

                // echo globally that this client has left
                this.socket.broadcast.emit(wsEvents.USER_LEFT, {
                    username: this.socket.username,
                    numUsers: this.numUsers
                });
            });
        }
    }
}

module.exports = UserSocketController;