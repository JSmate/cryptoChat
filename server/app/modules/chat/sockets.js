'use strict';
var io = require('./helpers/SocketIO.helper').instance();

var UserSocketController = require('./controllers/UserSocketController');
var wsEvents = require('./config/ws-events');

var nsp = io.of('/chat');

var numUsers = 0;

nsp.on(wsEvents.CONNECTION, socket => {
    var socketHandler = new UserSocketController(nsp, socket, numUsers);

    listenToEvents(socketHandler);
});

function listenToEvents(socketHandler) {
    socketHandler.socket.on(wsEvents.NEW_MESSAGE, socketHandler.newMessage.bind(socketHandler));
    socketHandler.socket.on(wsEvents.ADD_USER, socketHandler.addUser.bind(socketHandler));
    socketHandler.socket.on(wsEvents.TYPING, socketHandler.typing.bind(socketHandler));
    socketHandler.socket.on(wsEvents.STOP_TYPING, socketHandler.stopTyping.bind(socketHandler));
    socketHandler.socket.on(wsEvents.DISCONNECT, socketHandler.disconnect.bind(socketHandler));
}
