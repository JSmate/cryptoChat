'use strict';

export function messagesDirective(Chat) {
    return {
        restrict: 'E',
        template: `
                <ul class="messages">

                     <li class="clearfix" ng-repeat="item in messages">
                             <div class="message-data align-right">
                                <span class="message-data-time" >{{item.time}}</span> &nbsp; &nbsp;
                                 <span class="message-data-name" >{{item.user}}</span> <i class="fa fa-circle me"></i>

                            </div>
                     <div class="message other-message float-right">
{{item.message}}</div>
                     </li>
                </ul>
        `,
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