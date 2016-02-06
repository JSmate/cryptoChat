import angular from 'angular';
import uiRouter from 'angular-ui-router';

import {routes} from './config/chat.routes';

import {UserSocketService} from './services/user-socket.service';
import {ChatService} from './services/chat.service';

import {ChatController} from './controllers/chat.controller';

import {messagesDirective} from './directives/messages.directive';

export default angular.module('app.chat', [uiRouter])
    .config(routes)

    .service('UserSocket', UserSocketService)
    .service('Chat', ChatService)

    .controller('ChatController', ChatController)

    .directive('messages', messagesDirective)

    .name;