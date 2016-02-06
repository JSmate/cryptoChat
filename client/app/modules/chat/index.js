import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {routes} from './config/chat.routes';

import {UserSocketService} from './services/user-socket.service';

import {ChatController} from './controllers/chat.controller';


export default angular.module('app.chat', [uiRouter])
    .config(routes)

    .service('UserSocket', UserSocketService)

    .controller('ChatController', ChatController)

    .name;