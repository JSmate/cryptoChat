'use strict';

export class UserService {
    constructor() {
        this.user = null;
    }

    setUser(user) {
        this.user = user;
    }

    updateUser(user) {
        angular.extend(this.user, user);
        return this.user;
    }

    getUser() {
        return this.user;
    }
}