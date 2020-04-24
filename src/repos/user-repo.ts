
import data from '../data/user-db';
import { User } from '../models/user';
import { CrudRepository } from './crud-repo';
<<<<<<< HEAD
import mailWorker from'../util/mail-worker';
import { 
    ResourceNotFoundError, 
=======
import {  
    AuthenticationError, 
>>>>>>> daf77b61dba2347995fae4e5003f00e0aa703e03
    BadRequestError, 
    NotImplementedError, 
    ResourceNotFoundError, 
    ResourcePersistenceError
} from '../errors/errors';

export class UserRepository implements CrudRepository<User> {

    private static instance: UserRepository;

    private constructor() {}

    static getInstance() {
        return !UserRepository.instance ? UserRepository.instance = new UserRepository() : UserRepository.instance;
    }

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
        
                resolve(users.map(this.removePassword));
        
            }, 250);

        });
    
    }

    getById(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new BadRequestError());
            }

            setTimeout(() => {
                
                const user = {...data.find(user => user.id === id)};

                if(Object.keys(user).length === 0) {
                    reject(new ResourceNotFoundError());
                    return;
                }

                resolve(this.removePassword(user));

            }, 250);

        });
    }

    getUserByUsername(un: string): Promise<User> {

        return new Promise<User>((resolve, reject) => {

            if (typeof un !== 'string' || !un) {
                reject(new BadRequestError());
                return;
            }
           
            setTimeout(() => {
        
                const user = {...data.filter(user => user.username === un)[0]};
                
                if (Object.keys(user).length == 0) {
                    reject(new ResourceNotFoundError());
                    return;
                }
        
                resolve(this.removePassword(user));
        
            }, 250);

        });
        
    
    }

    getUserByCredentials(un: string, pw: string) {
        
        return new Promise<User>((resolve, reject) => {

            if (!un || !pw || typeof un !== 'string' || typeof pw !== 'string') {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                const user = {...data.filter(user => user.username === un && user.password === pw).pop()!};
                
                if (Object.keys(user).length === 0) {
                    reject(new AuthenticationError('Bad credentials provided.'));
                    return;
                }
                
                resolve(this.removePassword(user));
        
            }, 250);

        });
    
    }

    save(newUser: User): Promise<User> {
            
        return new Promise<User>((resolve, reject) => {

            if (!newUser) {
                reject(new BadRequestError('Falsy user object provided.'));
                return;
            }
        
            let invalid = !Object.keys(newUser).every(key => {
                if(key == 'id') return true;
                return newUser[key];
            });
        
            if (invalid) {
                reject(new BadRequestError('Invalid property values found in provided user.'));
                return;
            }
        
            setTimeout(() => {
        
                let conflict = data.filter(user => user.username == newUser.username).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError('The provided username is already taken.'));
                    return;
                }
        
                conflict = data.filter(user => user.email == newUser.email).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError('The provided email is already taken.'));
                    return;
                }
        
                newUser.id = (data.length) + 1;
                data.push(newUser);
        
                resolve(this.removePassword(newUser));
        
            });

        });
    
    }

    update(updatedUser: User): Promise<boolean> {
        
        return new Promise<boolean>((resolve, reject) => {

            if (!updatedUser) {
                reject(new BadRequestError('Falsy user object provided.'));
                return;
            }

            let isValidId = this.isValidId(updatedUser.id);
            if(!isValidId) {
                reject(new BadRequestError('A valid id must be provided for update operations.'));
            }
        
            let isValidUser = Object.values(updatedUser).every(val => val);
            if (!isValidUser) {
                reject(new BadRequestError('Invalid property values found in provided user.'));
                return;
            }
        
            setTimeout(() => {
        
                let persistedUser = data.find(user => user.id === updatedUser.id);
        
                if (!persistedUser) {
                    reject(new ResourceNotFoundError('No user found with provided id.'));
                    return;
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
        return new Promise<boolean>((resolve, reject) => {
            reject(new NotImplementedError());
        });
    }

    private removePassword(user: User): User {
        let usr = {...user};
        delete usr.password;
        return usr;   
    }

<<<<<<< HEAD
}
=======
    private isValidId(id: number) {
        return (id && typeof id === 'number' && Number.isInteger(id) && id >= 0);
    }

}
>>>>>>> daf77b61dba2347995fae4e5003f00e0aa703e03
