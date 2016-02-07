'use strict';

var redisClient = require('../helpers/Redis.helper');
var config = require('../../../config/config');
var wsEvents = require('../config/ws-events');
var uuid = require('uuid');
var _ = require('lodash');

class UserSocketController {
    constructor(nsp, socket) {
        this.nsp = nsp;
        this.socket = socket;

        this.connection();
    }

    connection() {
        console.log('user connected');
    }

    /**
     *
     * @param message
     * message = {
     *  sender: User,
     *  receiver: User,
     *  body: 'lorem ipsum'
     * }
     */
    newMessage(message) {
        // we tell the client to execute 'new message'

        message.timestamp = new Date();

        redisClient.hgetall('user:' + message.receiver.id, (err, user) => {
            this.socket.to(user.socketId).emit(wsEvents.NEW_MESSAGE, message);
        });
    }

    /**
     *
     * @param user
     * user = {
     *  username: 'Max',
     *  publicKey: 'nkjbcfbnf37z534857='
     * }
     */
    addUser(user) {
        user.id = uuid.v1();

        this.user = _.cloneDeep(user);
        this.user.socketId = this.socket.id;

        redisClient.hmset('user:' + this.user.id, this.user, (err, res) => {
            redisClient.keys('user:*', (err, userKeys) => {
                var batch = redisClient.batch();
                userKeys.forEach(x => x !== 'user:' + this.user.id && batch.hgetall(x));
                batch.exec((err, users) => {
                    users.forEach(x => delete x.socketId);
                    this.socket.emit(wsEvents.LOGIN, {
                        user: user,
                        onlineUsers: users
                    });
                });
            });

            // echo globally (all clients) that a person has connected
            this.socket.broadcast.emit(wsEvents.USER_JOINED, {
                user: user
            });
        });
    }

    //TODO: not implemented in the right way yet
    typing() {
        this.socket.broadcast.emit(wsEvents.TYPING, {
            username: this.socket.username
        });
    }

    //TODO: not implemented in the right way yet
    stopTyping() {
        this.socket.broadcast.emit(wsEvents.STOP_TYPING, {
            username: this.socket.username
        });
    }

    disconnect() {
        console.log('user disconnected');
        if (this.user) {
            redisClient.del('user:' + this.user.id, (err, reply) => {
                redisClient.keys('user:*', (err, userKeys) => {

                    // echo globally that this client has left
                    this.socket.broadcast.emit(wsEvents.USER_LEFT, {
                        user: this.user
                    });
                });
            });
        }
    }
}

module.exports = UserSocketController;