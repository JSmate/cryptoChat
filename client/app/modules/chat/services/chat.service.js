'use strict';

export class ChatService {
    constructor() {

    }

    register(functionName, fn) {
        this[functionName] = fn;
    }
}