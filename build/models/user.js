"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, un, pw, fn, ln, email, dob) {
        this.id = id;
        this.username = un;
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.dob = dob;
        this.age = Math.abs(new Date(Date.now() - this.dob.getTime()).getUTCFullYear() - 1970);
    }
    return User;
}());
exports.User = User;
