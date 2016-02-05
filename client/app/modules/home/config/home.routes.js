'use strict';

import homeView from '../views/home.view.html';

export function routes($stateProvider) {
    $stateProvider
        .state('main.home', {
            url: '/home',
            views: {
                'content@main': {
                    templateUrl: homeView,
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        });
}