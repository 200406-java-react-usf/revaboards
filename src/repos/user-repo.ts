import data from '../data/user-db';
import { ResourceNotFoundError, BadRequestError, ResourcePersistenceError, AuthenticationError, NotImplementedError } from '../errors/errors';
import { User } from '../models/user';
import { CrudRepository } from '../repos/crud-repo';
import Validator from '../util/validator';


export class UserRepository implements CrudRepository<User>{

    private static instance: UserRepository;

    private constructor() {}

    static getInstance() {
        return !UserRepository.instance ? UserRepository.instance = new UserRepository() : UserRepository.instance;
    }

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

            resolve(user.map(this.removePassword));

        });

    }

    private removePassword(user: User): User {

        let usr = {...user};
        delete usr.password;
        return usr;

    }

    getById(id: number): Promise<User>{

        return new Promise<User>((resolve,reject) => {

            if (!Validator.isValidId(id)) {
                reject(new BadRequestError());
                return;
            }

            setTimeout(() =>{

                const user: User = {...data.filter( user => user.id === id).pop() as User};

                if (Object.keys(user).length === 0){
                    reject(new BadRequestError());
                    return;
                }

                resolve(this.removePassword(user));

            },1000);
           

        });

    }

    getUserByUsername (un: string): Promise<User>{

        return new Promise<User>((resolve, reject) => {

            if (!Validator.isValidString(un)) {
                reject(new BadRequestError());
                return;
            }

            setTimeout(() => {
    
                const user = {...data.filter(user => user.username === un).pop() as User};
                
                if (Object.keys(user).length == 0) {
                    reject(new ResourceNotFoundError());
                    return;
                }   
        
                resolve(this.removePassword(user));
        
            }, 250);

        });

    
    }

    getUserByCredentials(un: string, pw: string): Promise<User>{

        return new Promise<User>((resolve, reject) => {

            if (!Validator.isValidString(un,pw)) {
                reject(new BadRequestError());
                return;
            }
        
            setTimeout(() => {
        
                const user = {...data.filter(user => user.username === un && user.password === pw).pop() as User};
                
                if (Object.keys(user).length === 0) {
                    reject(new AuthenticationError());
                    return;
                }
                
                resolve(user);
        
            }, 250);

        });

    }

    save(newUser: User): Promise<User>{
            
        return new Promise<User> ((resolve,reject) => {

            if (!Validator.isValidObject(newUser, 'id')) {
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
        
                resolve(this.removePassword(newUser));
        
            });

        });

        
    
    }

    update(updatedUser: User): Promise<boolean>{

        return new Promise<boolean> ((resolve,reject) => {

            if (!Validator.isValidObject(updatedUser,'id') || !Validator.isValidId(updatedUser.id)) {
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

            if (!Validator.isValidId(id)) {
                reject(new BadRequestError());
                return;
            }

            return new Promise<boolean>((resolve,reject) => {
                reject(new NotImplementedError());
            });

        });

    }

}

