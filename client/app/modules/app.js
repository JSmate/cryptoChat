'use strict';

import angular from 'angular';
import config from './app.config.js';

//libs
import '../libs/JSEncrypt';

//styles
import './main/assets/sass/styles.scss';

//dependencies
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import uiBootstrap from 'angular-ui-bootstrap';
import socketIo from '../libs/socketIo';

//modules
import main from './main';
import home from './home';
import chat from './chat';
import login from './login';

//Start by defining the main module and adding the module dependencies
angular.module('app', [
    ngResource,
    uiRouter,
    ngSanitize,
    uiBootstrap,
    socketIo,

    main,
    home,
    chat,
    login
]).config(config);

//Then define the init function for starting up the application
angular.element(document).ready(function () {

    var angularContainer = document.body;
    //Then init the app
    angular.bootstrap(angularContainer, ['app']);
});