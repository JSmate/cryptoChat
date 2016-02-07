'use strict';

import messagesTemplate from '../views/messages.template.html';

export function messagesDirective(User) {
    return {
        restrict: 'E',
        templateUrl: messagesTemplate,
        scope: {
            messages: '='
        },
        replace: true,
        controller: function() {
            var vm = this;
            vm.user = User.getUser();
        },
        controllerAs: 'vm',
        bindToController: true
    };
}