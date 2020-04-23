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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_db_1 = __importDefault(require("../data/user-db"));
var errors_1 = require("../errors/errors");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.getAll = function () {
        return new Promise(function (resolve, reject) {
            var user = [];
            for (var _i = 0, data_1 = user_db_1.default; _i < data_1.length; _i++) {
                var users = data_1[_i];
                user.push(__assign({}, users));
            }
            if (user.length == 0) {
                reject(new errors_1.ResourceNotFoundError());
                return;
            }
            resolve(user);
        });
    };
    UserRepository.prototype.getById = function (id) {
        return new Promise(function (resolve, reject) {
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = __assign({}, user_db_1.default.filter(function (user) { return user.id === id; }).pop());
                if (!user) {
                    reject(new errors_1.BadRequestError());
                    return;
                }
                resolve(user);
            }, 1000);
        });
    };
    UserRepository.prototype.getUserByUsername = function (un) {
        return new Promise(function (resolve, reject) {
            if (typeof un !== 'string' || !un) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = __assign({}, user_db_1.default.filter(function (user) { return user.username === un; }).pop());
                if (Object.keys(user).length == 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(user);
            }, 250);
        });
    };
    UserRepository.prototype.getUserByCredentials = function (un, pw) {
        return new Promise(function (resolve, reject) {
            if (!un || !pw || typeof un !== 'string' || typeof pw !== 'string') {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var user = user_db_1.default.filter(function (user) { return user.username === un && user.password === pw; }).pop();
                if (!user) {
                    reject(new errors_1.AuthenticationError());
                    return;
                }
                resolve(user);
            }, 250);
        });
    };
    UserRepository.prototype.save = function (newUser) {
        return new Promise(function (resolve, reject) {
            if (!newUser) {
                reject(new errors_1.BadRequestError());
                return;
            }
            var invalid = !Object.keys(newUser).every(function (key) {
                if (key == 'id')
                    return true;
                // let index: number = +key;
                // return newUser[index]
                key;
            });
            if (invalid) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var conflict = user_db_1.default.filter(function (user) { return user.username == newUser.username; }).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError());
                    return;
                }
                conflict = user_db_1.default.filter(function (user) { return user.email == newUser.email; }).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError());
                    return;
                }
                newUser.id = (user_db_1.default.length) + 1;
                user_db_1.default.push(newUser);
                resolve(newUser);
            });
        });
    };
    UserRepository.prototype.update = function (updatedUser) {
        return new Promise(function (resolve, reject) {
            if (!updatedUser) {
                reject(new errors_1.BadRequestError());
                return;
            }
            if (!updatedUser.id) {
                reject(new errors_1.BadRequestError());
                return;
            }
            var invalid = !Object.keys(updatedUser).every(function (key) { return key; } /*updatedUser[key]*/);
            if (invalid) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var persistedUser = user_db_1.default.find(function (user) { return user.id === updatedUser.id; });
                if (!persistedUser) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                if (persistedUser.username != updatedUser.username) {
                    reject(new errors_1.ResourcePersistenceError());
                    return;
                }
                var conflict = user_db_1.default.filter(function (user) {
                    if (user.id == updatedUser.id)
                        return false;
                    return user.email == updatedUser.email;
                }).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError());
                    return;
                }
                persistedUser = updatedUser;
                resolve(true);
            }, 1000);
        });
    };
    UserRepository.prototype.deleteById = function (id) {
        return new Promise(function (resolve, reject) {
            return new Promise(function (resolve, reject) {
                reject(new errors_1.NotImplementedError());
            });
        });
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
