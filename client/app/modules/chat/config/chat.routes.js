'use strict';

import chatView from '../views/chat.view.html';

export function routes($stateProvider) {
    $stateProvider
        .state('main.chat', {
            url: '/chat',
            views: {
                'content@main': {
                    templateUrl: chatView,
                    controller: 'ChatController',
                    controllerAs: 'vm'
                }
            }
        });
}