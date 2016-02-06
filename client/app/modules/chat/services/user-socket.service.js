'use strict';

export class UserSocketService {
    constructor(socketFactory) {
        this.socketFactory = socketFactory;
        this._socket = null;
    }

    create() {
        var ioSocket = io.connect('http://localhost:3000/chat');

        var socket = this.socketFactory({
            ioSocket: ioSocket
        });

        this._socket = socket;

        return socket;
    }

    getSocket() {
        return this._socket;
    }
}