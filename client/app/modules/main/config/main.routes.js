'use strict';

var mainView = require('../views/main.view.html');

export default function routes ($stateProvider) {
    $stateProvider
        .state('main', {
            abstract: true,
            views: {
                main: {
                    templateUrl: mainView,
                    controller: 'MainController as mainVm'
                }
            }
        });
}