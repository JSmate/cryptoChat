'use strict';

export function ChatController(UserSocket, Chat, User, $scope) {
    var vm = this;

    var socket = UserSocket.getSocket();

    vm.messageBody = '';
    vm.messages = {};
    vm.newMessages = [];
    vm.user = null;
    vm.onlineUsers = [];
    vm.selectedUser = null;

    // Whenever the server emits 'login', log the login message
    socket.on('login', function (data) {
        vm.user = User.updateUser(data.user);
        vm.onlineUsers = data.onlineUsers;
    });

    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', function (message) {
        var crypt = new JSEncrypt();
        crypt.setPrivateKey(vm.user.privateKey);
        message.body = crypt.decrypt(message.body);

        vm.messages[message.sender.id] = vm.messages[message.sender.id] || [];
        vm.messages[message.sender.id].push(message);

        if(vm.newMessages.indexOf(message.sender.id) === -1) {
            vm.newMessages.push(message.sender.id);
        }
    });

    // Whenever the server emits 'user joined', log it in the chat body
    socket.on('user joined', function (data) {
        vm.onlineUsers.push(data.user);
    });

    // Whenever the server emits 'user left', log it in the chat body
    socket.on('user left', function (data) {
        for(var i = 0, n = vm.onlineUsers.length; i < n; i++) {
            if(vm.onlineUsers[i].id === data.user.id) {
                vm.onlineUsers.splice(i, 1);
                break;
            }
        }
    });

    vm.updateTyping = updateTyping;
    vm.sendMessage = sendMessage;
    vm.selectUser = selectUser;
    vm.hasNewMessage = hasNewMessage;
    vm.pressedEnter = pressedEnter;

    function updateTyping() {
        console.log('test');
    }

    function selectUser(user) {
        vm.selectedUser = user;
        for(var i = 0, n = vm.newMessages.length; i < n ; i++) {
            if(vm.newMessages[i] === vm.selectedUser.id) {
                vm.newMessages.splice(i, 1);
                break;
            }
        }
    }

    function hasNewMessage (user) {
        return vm.newMessages.indexOf(user.id) !== -1 &&
            (!vm.selectedUser || vm.selectedUser && vm.selectedUser.id !== user.id);
    }

    function pressedEnter (e) {
        if(e.which === 13) {
            sendMessage();
        }
    }

    // Sends a chat message
    function sendMessage() {
        // if there is a non-empty message and a socket connection
        if (vm.messageBody && socket) {
            var crypt = new JSEncrypt();
            crypt.setPublicKey(vm.selectedUser.publicKey);
            var message = {
                sender: vm.user,
                receiver: vm.selectedUser,
                body: angular.copy(vm.messageBody)
            };

            vm.messageBody = '';
            vm.messages[vm.selectedUser.id] = vm.messages[vm.selectedUser.id] || [];
            vm.messages[vm.selectedUser.id].push(angular.copy(message));
            message.body = crypt.encrypt(message.body);

            // tell server to execute 'new message' and send along one parameter
            socket.emit('new message', message);
        }
    }
}