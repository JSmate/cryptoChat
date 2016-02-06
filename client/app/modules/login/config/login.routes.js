'use strict';

import loginView from '../views/login.view.html';

export function routes($stateProvider) {
    $stateProvider
        .state('main.login', {
            url: '/login',
            views: {
                'content@main': {
                    templateUrl: loginView,
                    controller: 'LoginController',
                    controllerAs: 'vm'
                }
            }
        });
}