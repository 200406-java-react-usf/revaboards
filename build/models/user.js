"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, un, pw, fn, ln, email, dob) {
        this.id = id;
        this.username = un;
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.dob = dob;
    }
}
exports.User = User;
