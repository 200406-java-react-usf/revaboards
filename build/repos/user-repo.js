"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var data = require('../data/user-db');
var errors = require('../errors/errors');
module.exports = (function () {
    var instance;
    function init() {
        var getAllUsers = function (cb) {
            setTimeout(function () {
                var users = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    user = data_1[_i];
                    users.push(__assign({}, user));
                }
                if (users.length == 0) {
                    cb(new errors.ResourceNotFoundError());
                    return;
                }
                users = users.map(function (user) {
                    delete user.password;
                    return user;
                });
                cb(null, users);
            }, 250);
        };
        var getUserById = function (id, cb) {
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                cb(new errors.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = __assign({}, data.filter(function (user) { return user.id === id; }).pop());
                if (!user) {
                    cb(new errors.ResourceNotFoundError());
                    return;
                }
                cb(null, user);
            }, 250);
        };
        var getUserByUsername = function (un, cb) {
            if (typeof un !== 'string' || !un) {
                cb(new errors.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = __assign({}, data.filter(function (user) { return user.username === un; }).pop());
                if (Object.keys(user).length == 0) {
                    cb(new errors.ResourceNotFoundError());
                    return;
                }
                cb(null, user);
            }, 250);
        };
        var getUserByCredentials = function (un, pw, cb) {
            if (!un || !pw || typeof un !== 'string' || typeof pw !== 'string') {
                cb(new errors.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = data.filter(function (user) { return user.username === un && user.password === pw; }).pop();
                if (!user) {
                    cb(new errors.AuthenticationError('Bad credentials provided.'));
                    return;
                }
                cb(null, user);
            }, 250);
        };
        var addNewUser = function (newUser, cb) {
            if (!newUser) {
                cb(new errors.BadRequestError('Falsy user object provided.'));
                return;
            }
            var invalid = !Object.keys(newUser).every(function (key) {
                if (key == 'id')
                    return true;
                return newUser[key];
            });
            if (invalid) {
                cb(new errors.BadRequestError('Invalid property values found in provided user.'));
                return;
            }
            setTimeout(function () {
                var conflict = data.filter(function (user) { return user.username == newUser.username; }).pop();
                if (conflict) {
                    cb(new errors.ResourcePersistenceError('The provided username is already taken.'));
                    return;
                }
                conflict = data.filter(function (user) { return user.email == newUser.email; }).pop();
                if (conflict) {
                    cb(new errors.ResourcePersistenceError('The provided email is already taken.'));
                    return;
                }
                newUser.id = (data.length) + 1;
                data.push(newUser);
                cb(null, newUser);
            });
        };
        var updateUser = function (updatedUser, cb) {
            if (!updatedUser) {
                cb(new errors.BadRequestError('Falsy user object provided.'));
                return;
            }
            if (!updatedUser.id) {
                cb(new errors.BadRequestError('An id must be provided for update operations.'));
                return;
            }
            var invalid = !Object.keys(updatedUser).every(function (key) { return updatedUser[key]; });
            if (invalid) {
                cb(new errors.BadRequestError('Invalid property values found in provided user.'));
                return;
            }
            setTimeout(function () {
                var persistedUser = data.find(function (user) { return user.id === updatedUser.id; });
                if (!persistedUser) {
                    cb(new errors.ResourceNotFoundError('No user found with provided id.'));
                }
                if (persistedUser.username != updatedUser.username) {
                    cb(new errors.ResourcePersistenceError('Usernames cannot be updated.'));
                    return;
                }
                var conflict = data.filter(function (user) {
                    if (user.id == updatedUser.id)
                        return false;
                    return user.email == updatedUser.email;
                }).pop();
                if (conflict) {
                    cb(new errors.ResourcePersistenceError('Provided email is taken by another user.'));
                    return;
                }
                persistedUser = updatedUser;
                cb(null, true);
            });
        };
        return {
            getAllUsers: getAllUsers,
            getUserById: getUserById,
            getUserByUsername: getUserByUsername,
            getUserByCredentials: getUserByCredentials,
            addNewUser: addNewUser,
            updateUser: updateUser
        };
    }
    return {
        getInstance: function () {
            return !instance ? instance = init() : instance;
        }
    };
})();
