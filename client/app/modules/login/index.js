import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {routes} from './config/login.routes';

import {LoginController} from './controllers/login.controller';


export default angular.module('app.login', [uiRouter])
    .config(routes)

    .controller('LoginController', LoginController)

    .name;