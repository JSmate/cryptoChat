'use strict';

export class UserService {
    constructor() {
        this.user = null;
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}