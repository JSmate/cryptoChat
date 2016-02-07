'use strict';

export function focusMeDirective($timeout) {
    return {
        restrict: 'A',
        scope: {trigger: '@focusMe'},
        replace: true,
        link: (scope, elem, attrs) => {
            scope.$watch('trigger', (value) => {
                if (value === 'true') {
                    $timeout(() => {
                        elem[0].focus();
                    });
                }
            });
        }
    };
}