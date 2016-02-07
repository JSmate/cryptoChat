'use strict';

import messagesTemplate from '../views/messages.template.html';

export function messagesDirective(Chat) {
    return {
        restrict: 'E',
        templateUrl: messagesTemplate,
        scope: {},
        replace: true,
        link: (scope, elem, attrs) => {
            scope.messages = [
                {
                    user: 'Frank',
                    message: 'Yo Tom'
                },
                {
                    user: 'Tom',
                    message: 'Hey Frank'
                }
            ];
        }
    };
}