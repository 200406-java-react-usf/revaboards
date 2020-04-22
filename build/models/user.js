"use strict";
module.exports = /** @class */ (function () {
    function User(id, un, pw, fn, ln, email, dob) {
        this.id = id;
        this.username = un;
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.dob = dob;
    }
    User.prototype.age = function () {
        return Math.abs(new Date(Date.now() - this.dob.getTime()) - 1970);
    };
    return User;
}());
