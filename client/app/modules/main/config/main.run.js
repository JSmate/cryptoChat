'use strict';

export default function run ($rootScope, UserSocket, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
        if(toState.data && toState.data.requireLogin && !UserSocket.getSocket()) {
            event.preventDefault();
            $state.go('main.login');
        }
    });
}