'use strict';

export function LoginController(UserSocket, $state, User) {
    var vm = this;

    var socket = UserSocket.create();

    vm.username = null;

    vm.setUsername = setUsername;

    // Sets the client's username
    function setUsername (e) {
        // If the username is valid
        if (e.which === 13 && vm.username) {
            // Tell the server your username
            socket.emit('add user', vm.username);

            User.setUser({username: vm.username});

            $state.go('main.chat');
        }
    }
}