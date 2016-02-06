import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {routes} from './config/login.routes';

import {UserService} from './services/user.service';

import {LoginController} from './controllers/login.controller';


export default angular.module('app.login', [uiRouter])
    .config(routes)

    .service('User', UserService)

    .controller('LoginController', LoginController)

    .name;