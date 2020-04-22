import data from '../data/user-db'
import { ResourceNotFoundError, BadRequestError, ResourcePersistenceError, AuthenticationError, NotImplementedError } from '../errors/errors'
import { User } from '../models/user'
import { CrudRepository } from '../repos/crud-repo'

export class UserRepository implements CrudRepository<User>{

    getAll(): Promise<User[]>{

        return new Promise<User[]>((resolve,reject) => {

            let user: User[] = [];

            for (let users of data){
                user.push({...users});
            }

            if (user.length == 0) {
                reject(new ResourceNotFoundError());
                return;
            }

            resolve(user);

        });

    }

    getById(id: number): Promise<User>{

        return new Promise<User>((resolve,reject) => {

            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new BadRequestError());
                return;
            }

            setTimeout(() =>{

                const user: User = {...data.filter( user => user.id === id).pop()};

                if (!user){
                    reject(new BadRequestError());
                    return;
                }

                resolve(user);

            },1000);
           

        });

    }

    getUserByUsername (un: string): Promise<User>{

        return new Promise<User>((resolve, reject) => {

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
        
                resolve(user);
        
            }, 250);

        });

    
    }

    getUserByCredentials(un: string, pw: string): Promise<User>{

        return new Promise<User>((resolve, reject) => {

            if (!un || !pw || typeof un !== 'string' || typeof pw !== 'string') {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                const user = data.filter(user => user.username === un && user.password === pw).pop();
                
                if (!user) {
                    reject(new AuthenticationError());
                    return;
                }
                
                resolve(user);
        
            }, 250);

        });

    }

    save(newUser: User): Promise<User>{
            
        return new Promise<User> ((resolve,reject) => {

            if (!newUser) {
                reject(new BadRequestError());
                return;
            }

            let invalid = !Object.keys(newUser).every((key) => {
                if(key == 'id') return true;
                // let index: number = +key;
                // return newUser[index]
                key
            });
        
            if (invalid) {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                let conflict = data.filter(user => user.username == newUser.username).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError());
                    return;
                }
        
                conflict = data.filter(user => user.email == newUser.email).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError());
                    return;
                }
        
                newUser.id = (data.length) + 1;
                data.push(newUser);
        
                resolve(newUser);
        
            });

        });

        
    
    }

    update(updatedUser: User): Promise<boolean>{

        return new Promise<boolean> ((resolve,reject) => {

            if (!updatedUser) {
                reject(new BadRequestError());
                return;
            }
        
            if (!updatedUser.id) {
                reject(new BadRequestError());
                return;
            }
        
            let invalid = !Object.keys(updatedUser).every(key => key /*updatedUser[key]*/);
        
            if (invalid) {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                let persistedUser = data.find(user => user.id === updatedUser.id);
        
                if (!persistedUser) {
                    reject(new ResourceNotFoundError());
                    return;
                }
                
                if (persistedUser.username != updatedUser.username) {
                    reject(new ResourcePersistenceError());
                    return;
                }
        
                const conflict = data.filter(user => {
                    if (user.id == updatedUser.id) return false;
                    return user.email == updatedUser.email; 
                }).pop();
        
                if (conflict) {
                    reject(new ResourcePersistenceError());
                    return;
                }
    
                persistedUser = updatedUser;
                resolve(true);
                
            },1000);   

        });

    }

    deleteById(id: number): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            return new Promise<boolean>((resolve,reject) => {
                reject(new NotImplementedError());
            });

        });

    }

}

