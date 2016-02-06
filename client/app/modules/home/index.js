import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {routes} from './config/home.routes';
import {HomeController} from './controllers/home.controller';


export default angular.module('app.chat', [uiRouter])
    .config(routes)

    .controller('HomeController', HomeController)

    .name;