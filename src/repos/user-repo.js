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
exports.__esModule = true;
var user_db_1 = require("../data/user-db");
var validator_1 = require("../util/validator");
var errors_1 = require("../errors/errors");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.getInstance = function () {
        return !UserRepository.instance ? UserRepository.instance = new UserRepository() : UserRepository.instance;
    };
    UserRepository.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var users = [];
                for (var _i = 0, data_1 = user_db_1["default"]; _i < data_1.length; _i++) {
                    var user = data_1[_i];
                    users.push(__assign({}, user));
                }
                if (users.length == 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(users.map(_this.removePassword));
            }, 250);
        });
    };
    UserRepository.prototype.getById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!validator_1["default"].isValidId(id)) {
                reject(new errors_1.BadRequestError());
            }
            setTimeout(function () {
                var user = __assign({}, user_db_1["default"].find(function (user) { return user.id === id; }));
                if (Object.keys(user).length === 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(_this.removePassword(user));
            }, 250);
        });
    };
    UserRepository.prototype.getUserByUsername = function (un) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!validator_1["default"].isValidStrings(un)) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = __assign({}, user_db_1["default"].filter(function (user) { return user.username === un; })[0]);
                if (Object.keys(user).length == 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(_this.removePassword(user));
            }, 250);
        });
    };
    UserRepository.prototype.getUserByCredentials = function (un, pw) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!validator_1["default"].isValidStrings(un, pw)) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = __assign({}, user_db_1["default"].filter(function (user) { return user.username === un && user.password === pw; }).pop());
                if (Object.keys(user).length === 0) {
                    reject(new errors_1.AuthenticationError('Bad credentials provided.'));
                    return;
                }
                resolve(_this.removePassword(user));
            }, 250);
        });
    };
    UserRepository.prototype.save = function (newUser) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!validator_1["default"].isValidObject(newUser, 'id')) {
                reject(new errors_1.BadRequestError('Invalid property values found in provided user.'));
                return;
            }
            setTimeout(function () {
                var conflict = user_db_1["default"].filter(function (user) { return user.username == newUser.username; }).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError('The provided username is already taken.'));
                    return;
                }
                conflict = user_db_1["default"].filter(function (user) { return user.email == newUser.email; }).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError('The provided email is already taken.'));
                    return;
                }
                newUser.id = (user_db_1["default"].length) + 1;
                user_db_1["default"].push(newUser);
                resolve(_this.removePassword(newUser));
            });
        });
    };
    UserRepository.prototype.update = function (updatedUser) {
        return new Promise(function (resolve, reject) {
            if (!validator_1["default"].isValidObject(updatedUser) || !validator_1["default"].isValidId(updatedUser.id)) {
                reject(new errors_1.BadRequestError('Invalid user provided (invalid values found).'));
                return;
            }
            setTimeout(function () {
                var persistedUser = user_db_1["default"].find(function (user) { return user.id === updatedUser.id; });
                if (!persistedUser) {
                    reject(new errors_1.ResourceNotFoundError('No user found with provided id.'));
                    return;
                }
                if (persistedUser.username != updatedUser.username) {
                    reject(new errors_1.ResourcePersistenceError('Usernames cannot be updated.'));
                    return;
                }
                var conflict = user_db_1["default"].filter(function (user) {
                    if (user.id == updatedUser.id)
                        return false;
                    return user.email == updatedUser.email;
                }).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError('Provided email is taken by another user.'));
                    return;
                }
                persistedUser = updatedUser;
                resolve(true);
            });
        });
    };
    UserRepository.prototype.deleteById = function (id) {
        return new Promise(function (resolve, reject) {
            if (!validator_1["default"].isValidId(id)) {
                reject(new errors_1.BadRequestError());
            }
            reject(new errors_1.NotImplementedError());
        });
    };
    UserRepository.prototype.removePassword = function (user) {
        var usr = __assign({}, user);
        delete usr.password;
        return usr;
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
