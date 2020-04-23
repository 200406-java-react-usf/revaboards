import data from '../data/user-db';
import { User } from '../models/user';
import { CrudRepository } from './crud-repo';
import { MailWorker } from '../util/mail-worker';

import { 
    BadRequestError, 
    ResourceNotFoundError, 
    ResourcePersistenceError ,
    AuthenticationError
}  from '../errors/errors';


export class UserRepository implements CrudRepository<User> {

    private static instance: UserRepository;

    private constructor() { }

    static getInstance() {
        return !UserRepository.instance ? UserRepository.instance = new UserRepository() : UserRepository.instance;
    }

    getAll(): Promise<User[]> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                
                let users = [];
    
                for (let user of data) {
                    users.push({...user});
                }
        
                if (users.length == 0) {
                    reject(new ResourceNotFoundError());
                    return;
                }
        
                resolve(users.map(this.removePassword));
        
            }, 250);
        });
    }

    getById(id: number): Promise<User> {

        return new Promise((resolve, reject) => {

            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                const user = {...data.filter(user => user.id === id).pop()};
                
                if (!user) {
                    reject(new ResourceNotFoundError());
                    return;
                }
        
                resolve(this.removePassword(user));
        
            }, 250);
        });
    
    }
    
    getUserByUsername(un: string): Promise<User> {

        return new Promise((resolve, reject) => {
    
            if (typeof un !== 'string' || !un) {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                const user = {...data.filter(user => user.username === un).pop()};
                
                if (Object.keys(user).length == 0) {
                    reject(new ResourceNotFoundError());
                    return;
                }
        
                resolve(this.removePassword(user));
        
            }, 250);
        });
    }
    
    getUserByCredentials(un: string, pw: string): Promise<User> {

        return new Promise((resolve, reject) => {
    
            if (!un || !pw || typeof un !== 'string' || typeof pw !== 'string') {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                const user = data.filter(user => user.username === un && user.password === pw).pop();
                
                if (!user) {
                    reject(new AuthenticationError('Bad credentials provided.'));
                    return;
                }
                
                resolve(this.removePassword(user));
        
            }, 250);
        });    
    }
    
    save(newUser: User): Promise<User> {

        let newUsr = {...newUser};
        
        return new Promise((resolve, reject) => {

            if (!newUsr) {
                reject(new BadRequestError('Falsy user object provided.'));
                return;
            }
        
            let invalid = !Object.keys(newUsr).every(key => {
                if(key == 'id') return true;
                return newUsr[key];
            });
        
            if (invalid) {
                reject(new BadRequestError('Invalid property values found in provided user.'));
                return;
            }
        
            setTimeout(() => {
        
                let conflict = data.filter(user => user.username == newUsr.username).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError('The provided username is already taken.'));
                    return;
                }
        
                conflict = data.filter(user => user.email == newUsr.email).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError('The provided email is already taken.'));
                    return;
                }
        
                newUsr.id = (data.length) + 1;
                data.push(newUsr);

                MailWorker.getInstance().emit('newRegister', newUsr.email);
        
                resolve(this.removePassword(newUsr));
        
            });

        });
        
    
    }
    
    update(updatedUser: User): Promise<boolean> {
    
        return new Promise((resolve, reject) => {

            if (!updatedUser) {
                reject(new BadRequestError('Falsy user object provided.'));
                return;
            }
        
            if (!updatedUser.id) {
                reject(new BadRequestError('An id must be provided for update operations.'));
                return;
            }
        
            let invalid = !Object.values(updatedUser).every(val => val);
        
            if (invalid) {
                reject(new BadRequestError('Invalid property values found in provided user.'));
                return;
            }
        
            setTimeout(() => {
        
                let persistedUser = data.find(user => user.id === updatedUser.id);
        
                if (!persistedUser) {
                    reject(new ResourceNotFoundError('No user found with provided id.'));
                }
                
                if (persistedUser.username != updatedUser.username) {
                    reject(new ResourcePersistenceError('Usernames cannot be updated.'));
                    return;
                }
        
                const conflict = data.filter(user => {
                    if (user.id == updatedUser.id) return false;
                    return user.email == updatedUser.email; 
                }).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError('Provided email is taken by another user.'));
                    return;
                }
    
                persistedUser = updatedUser;
                resolve(true);
        
            });

        });
    
    }

    deleteById(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            reject('Not implemented');
        });
    }

    private removePassword(user) {
        let usr = {...user};
        delete usr.password;
        return usr;
    }

}
