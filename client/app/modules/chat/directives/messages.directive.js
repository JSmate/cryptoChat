'use strict';

export function messagesDirective (Chat) {
    return {
        restrict: 'E',
        template: '<ul class="messages"></ul>',
        scope: {},
        replace: true,
        link: (scope, elem, attrs) => {
            const FADE_TIME = 150;

            Chat.register('addParticipantsMessage', addParticipantsMessage);
            Chat.register('log', log);
            Chat.register('addChatMessage', addChatMessage);

            function addParticipantsMessage (data) {
                var message = '';
                if (data.numUsers === 1) {
                    message += 'there\'s 1 participant';
                } else {
                    message += 'there are ' + data.numUsers + ' participants';
                }
                log(message);
            }

            // Log a message
            function log (message, options) {
                var $el = $('<li>').addClass('log').text(message);
                addMessageElement($el, options);
            }

            // Adds the visual chat message to the message list
            function addChatMessage (data, options) {
                var $usernameDiv = $('<span class="username"/>')
                    .text(data.username);
                var $messageBodyDiv = $('<span class="messageBody">')
                    .text(data.message);

                var $messageDiv = $('<li class="message"/>')
                    .append($usernameDiv, $messageBodyDiv);

                addMessageElement($messageDiv, options);
            }

            function addMessageElement (el, options) {
                var $el = angular.element(el);

                // Setup default options
                if (!options) {
                    options = {};
                }
                if (typeof options.fade === 'undefined') {
                    options.fade = true;
                }
                if (typeof options.prepend === 'undefined') {
                    options.prepend = false;
                }

                // Apply options
                if (options.fade) {
                    $el.hide().fadeIn(FADE_TIME);
                }
                if (options.prepend) {
                    elem.prepend($el);
                } else {
                    elem.append($el);
                }
                elem[0].scrollTop = elem[0].scrollHeight;
            }
        }
    };
}