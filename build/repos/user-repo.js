"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_db_1 = require("../data/user-db");
const mail_worker_1 = require("../util/mail-worker");
const errors_1 = require("../errors/errors");
class UserRepository {
    constructor() { }
    static getInstance() {
        return !UserRepository.instance ? UserRepository.instance = new UserRepository() : UserRepository.instance;
    }
    getAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let users = [];
                for (let user of user_db_1.default) {
                    users.push(Object.assign({}, user));
                }
                if (users.length == 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(users.map(this.removePassword));
            }, 250);
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(() => {
                const user = Object.assign({}, user_db_1.default.filter(user => user.id === id).pop());
                if (!user) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(this.removePassword(user));
            }, 250);
        });
    }
    getUserByUsername(un) {
        return new Promise((resolve, reject) => {
            if (typeof un !== 'string' || !un) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(() => {
                const user = Object.assign({}, user_db_1.default.filter(user => user.username === un).pop());
                if (Object.keys(user).length == 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(this.removePassword(user));
            }, 250);
        });
    }
    getUserByCredentials(un, pw) {
        return new Promise((resolve, reject) => {
            if (!un || !pw || typeof un !== 'string' || typeof pw !== 'string') {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(() => {
                const user = user_db_1.default.filter(user => user.username === un && user.password === pw).pop();
                if (!user) {
                    reject(new errors_1.AuthenticationError('Bad credentials provided.'));
                    return;
                }
                resolve(this.removePassword(user));
            }, 250);
        });
    }
    save(newUser) {
        return new Promise((resolve, reject) => {
            if (!newUser) {
                reject(new errors_1.BadRequestError('Falsy user object provided.'));
                return;
            }
            let invalid = !Object.keys(newUser).every(key => {
                if (key == 'id')
                    return true;
                return newUser[key];
            });
            if (invalid) {
                reject(new errors_1.BadRequestError('Invalid property values found in provided user.'));
                return;
            }
            setTimeout(() => {
                let conflict = user_db_1.default.filter(user => user.username == newUser.username).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError('The provided username is already taken.'));
                    return;
                }
                conflict = user_db_1.default.filter(user => user.email == newUser.email).pop();
                if (conflict) {
                    reject(new errors_1.ResourcePersistenceError('The provided email is already taken.'));
                    return;
                }
                newUser.id = (user_db_1.default.length) + 1;
                user_db_1.default.push(newUser);
                mail_worker_1.MailWorker.getInstance().emit('newRegister', newUser.email);
                resolve(this.removePassword(newUser));
            });
        });
    }
    update(updatedUser) {
        return new Promise((resolve, reject) => {
            if (!updatedUser) {
                reject(new errors_1.BadRequestError('Falsy user object provided.'));
                return;
            }
            if (!updatedUser.id) {
                reject(new errors_1.BadRequestError('An id must be provided for update operations.'));
                return;
            }
            let invalid = !Object.values(updatedUser).every(val => val);
            if (invalid) {
                reject(new errors_1.BadRequestError('Invalid property values found in provided user.'));
                return;
            }
            setTimeout(() => {
                let persistedUser = user_db_1.default.find(user => user.id === updatedUser.id);
                if (!persistedUser) {
                    reject(new errors_1.ResourceNotFoundError('No user found with provided id.'));
                }
                if (persistedUser.username != updatedUser.username) {
                    reject(new errors_1.ResourcePersistenceError('Usernames cannot be updated.'));
                    return;
                }
                const conflict = user_db_1.default.filter(user => {
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
    }
    deleteById(id) {
        return new Promise((resolve, reject) => {
            reject('Not implemented');
        });
    }
    removePassword(user) {
        let usr = Object.assign({}, user);
        delete usr.password;
        return usr;
    }
}
exports.UserRepository = UserRepository;
