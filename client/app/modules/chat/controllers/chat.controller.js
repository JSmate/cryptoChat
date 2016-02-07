'use strict';

export function ChatController(UserSocket, Chat, User) {
    var vm = this;

    var socket = UserSocket.getSocket();

    vm.message = '';
    vm.onlineUsers = [];
    vm.selectedUser = null;

    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
        // Display the welcome message
        var message = 'Welcome to Socket.IO Chat – ';
        // TODO add message
        vm.onlineUsers = data.users;
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', function (data) {
        var crypt = new JSEncrypt();
        crypt.setPrivateKey(User.getUser().privateKey);
        data.message = crypt.decrypt(data.message);
        // TODO add message
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
        // TODO add message
        vm.onlineUsers.push(data.user);
    });


    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
        // TODO add message
    });

    vm.updateTyping = updateTyping;
    vm.sendMessage = sendMessage;

    function updateTyping() {
        console.log('test');
    }

    // Sends a chat message
    function sendMessage(e) {
        var crypt = new JSEncrypt();
        crypt.setPublicKey(vm.selectedUser.publicKey);
        var message = angular.copy(vm.message);

        // if there is a non-empty message and a socket connection
        if (message && socket) {
            vm.message = '';

            // TODO add message
            // tell server to execute 'new message' and send along one parameter
            var messageObj = {
                user: vm.selectedUser,
                message: crypt.encrypt(message)
            };
            socket.emit('new message', messageObj);
        }
    }
}