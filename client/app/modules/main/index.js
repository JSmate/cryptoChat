import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './config/main.routes.js';
import run from './config/main.run';

import MainController from './controllers/main.controller.js';


export default angular.module('app.main', [uiRouter])
    .config(routing)
    .run(run)

    .controller('MainController', MainController)

    .name;