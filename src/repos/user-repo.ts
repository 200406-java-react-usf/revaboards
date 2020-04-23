import { CrudRepository } from "./crud-repo";
import data from '../data/user-db';
import { User } from '../models/user'
import { ResourceNotFoundError } from '../errors/errors'
const mailWorker = require('../util/mail-worker');

export class UserRepository implements CrudRepository<User> {

    private static instace: UserRepository;
    private constructor() { }

    getAll(): Promise<User[]> {

        return new Promise<User[]>((resolve, reject) => {
            setTimeout(() => {
            
            let users = [];

            for (let user of data) {
                users.push({...user});
            }
    
            if (users.length == 0) {
                reject(new ResourceNotFoundError());
                return;
            }
    
            users = users.map(user => {
                delete user.password;
                return user;
            });
    
            resolve(users.map(this.removePassword));
    
        }, 250);
    }
    };
        
        



    static getInstance() {
        return !UserRepository.instace ? UserRepository.instace = new UserRepository() : UserRepository.instace;
    }
}

module.exports = (function() {


        const getAllUsers = (cb) => {

            setTimeout(() => {
                
                let users = [];
    
                for (let user of data) {
                    users.push({...user});
                }
        
                if (users.length == 0) {
                    cb(new errors.ResourceNotFoundError());
                    return;
                }
        
                users = users.map(user => {
                    delete user.password;
                    return user;
                });
        
                cb(null, users);
        
            }, 250);
        };
    
        const getUserById = (id) => { //used thunks to return the result
            let fn; //declared fn
            let user; //declared user
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                return function (cb){
                    cb(new errors.BadRequestError());
                };
            }
           
            setTimeout(() => {
        
                user = {...data.filter(user => user.id === id).pop()}; //retrieves the user by the id
                
                if (JSON.stringify(user) === '{}') {  //check if it actually return a user
                    fn(new errors.ResourceNotFoundError()); //since we are inside the setTimeout we set the fn = resource error
                }
                else if(fn){ //if the fn is empty then set it to our retrieved user
                    fn(user); 
                }
            }, 250);
            return function(cb){ //we return a callback function
                fn = cb; // if we havent gotten a result yet then we set fn = to our callback function
                
            };
        
        };
        
        const getUserByUsername = (un) => {
        
            // if (typeof un !== 'string' || !un) {
            //     cb(new errors.BadRequestError());
            //     return;
            // }
           
            // setTimeout(() => {
        
            //     const user = {...data.filter(user => user.username === un).pop()};
                
            //     if (Object.keys(user).length == 0) {
            //         cb(new errors.ResourceNotFoundError());
            //         return;
            //     }
            //     cb(null, user);
            // }, 250);
            let bad = new errors.BadRequestError();
            let resource = new errors.ResourceNotFoundError();
            return new Promise((resolve, reject) => {
                
                if (typeof un !== 'string' || !un) {
                    resolve(bad);
                    //reject(bad);                    
                }

                setTimeout(() => {
                    
                    const user = {...data.filter(user => user.username === un).pop()};
                    if (Object.keys(user).length == 0) {
                        resolve(resource);
                        //reject(resource);
                    }
                    else {
                        resolve(user);
                    }
                    
                });
            });
        
        };
        
        const getUserByCredentials = (un, pw, cb) => {
        
            if (!un || !pw || typeof un !== 'string' || typeof pw !== 'string') {
                cb(new errors.BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                const user = data.filter(user => user.username === un && user.password === pw).pop();
                
                if (!user) {
                    cb(new errors.AuthenticationError('Bad credentials provided.'));
                    return;
                }
                
                cb(null, user);
        
            }, 250);
        
        };
        
        const addNewUser = (newUser, cb) => {
            
            if (!newUser) {
                cb(new errors.BadRequestError('Falsy user object provided.'));
                return;
            }
        
            let invalid = !Object.keys(newUser).every(key => {
                if(key == 'id') return true;
                return newUser[key];
            });
        
            if (invalid) {
                cb(new errors.BadRequestError('Invalid property values found in provided user.'));
                return;
            }
        
            setTimeout(() => {
        
                let conflict = data.filter(user => user.username == newUser.username).pop();
        
                if (conflict) {
                    cb(new errors.ResourcePersistenceError('The provided username is already taken.'));
                    return;
                }
        
                conflict = data.filter(user => user.email == newUser.email).pop();
        
                if (conflict) {
                    cb(new errors.ResourcePersistenceError('The provided email is already taken.'));
                    return;
                }
        
                newUser.id = (data.length) + 1;
                data.push(newUser);

                mailWorker.emit('newRegister', newUser.email);
        
                cb(null, newUser);
        
            });
        
        };
        
        const updateUser = (updatedUser, cb) => {
        
            if (!updatedUser) {
                cb(new errors.BadRequestError('Falsy user object provided.'));
                return;
            }
        
            if (!updatedUser.id) {
                cb(new errors.BadRequestError('An id must be provided for update operations.'));
                return;
            }
        
            let invalid = !Object.values(updatedUser).every(val => val);
        
            if (invalid) {
                cb(new errors.BadRequestError('Invalid property values found in provided user.'));
                return;
            }
        
            setTimeout(() => {
        
                let persistedUser = data.find(user => user.id === updatedUser.id);
        
                if (!persistedUser) {
                    cb(new errors.ResourceNotFoundError('No user found with provided id.'));
                }
                
                if (persistedUser.username != updatedUser.username) {
                    cb(new errors.ResourcePersistenceError('Usernames cannot be updated.'));
                    return;
                }
        
                const conflict = data.filter(user => {
                    if (user.id == updatedUser.id) return false;
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
    


})();
