'use strict';

export function LoginController(UserSocket, $state, User) {
    var vm = this;

    var socket = UserSocket.create();

    vm.username = null;

    vm.setUser = setUser;

    // Sets the client's username
    function setUser (e) {
        // If the username is valid
        if (e.which === 13 && vm.username) {
            var crypt = new JSEncrypt();

            var user = {
                username: vm.username,
                publicKey: crypt.getPublicKey()
            };

            // Tell the server your username
            socket.emit('add user', user);

            user.privateKey = crypt.getPrivateKey();

            User.setUser(user);

            $state.go('main.chat');
        }
    }
}