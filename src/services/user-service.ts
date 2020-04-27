import { User } from "../models/user";
import { UserRepository } from "../repos/user-repo";
import { isValidId, isValidStrings, isValidObject, isPropertyOf } from "../util/validator";
import { BadRequestError, ResourceNotFoundError, NotImplementedError, ResourcePersistenceError, AuthenticationError } from "../errors/errors";

export class UserService {

    constructor(private userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    getAllUsers(): Promise<User[]> {

        return new Promise<User[]>(async (resolve, reject) => {

            let users: User[] = [];
            let result = await this.userRepo.getAll();

            for (let user of result) {
                users.push({...user});
            }

            if (users.length == 0) {
                reject(new ResourceNotFoundError());
                return;
            }

            resolve(users.map(this.removePassword));

        });

    }

    getUserById(id: number): Promise<User> {

        return new Promise<User>(async (resolve, reject) => {

            if (!isValidId(id)) {
                return reject(new BadRequestError());
            }

            let user = {...await this.userRepo.getById(id)};

            if(Object.keys(user).length === 0) {
                reject(new ResourceNotFoundError());
                return;
            }

            resolve(this.removePassword(user));

        });

    }

    getUserByUniqueKey(key: string, val: string): Promise<User> {

        return new Promise(async (resolve, reject) => {

            if (!isValidStrings(key, val) || !isPropertyOf(key, User)) {
                reject(new BadRequestError());
                return;
            }
            



        });

    }

    authenticateUser(un: string, pw: string): Promise<User> {

        return new Promise<User>(async (resolve, reject) => {

            if (!isValidStrings(un, pw)) {
                reject(new BadRequestError());
                return;
            }

            let authUser: User;
            try {
                authUser = await this.userRepo.getUserByCredentials(un, pw);
            } catch (e) {
                reject(e);
            }

            if (Object.keys(authUser).length === 0) {
                reject(new AuthenticationError('Bad credentials provided.'));
                return;
            }

            resolve(this.removePassword(authUser));

        });

    }

    addNewUser(newUser: User): Promise<User> {
        
        return new Promise<User>(async (resolve, reject) => {

            if (!isValidObject(newUser, 'id')) {
                reject(new BadRequestError('Invalid property values found in provided user.'));
                return;
            }

            let conflict = this.getUserByUniqueKey('username', newUser.username);
        
            if (conflict) {
                reject(new ResourcePersistenceError('The provided username is already taken.'));
                return;
            }
        
            conflict = this.getUserByUniqueKey('email', newUser.email);
    
            if (conflict) {
                reject(new ResourcePersistenceError('The provided email is already taken.'));
                return;
            }

            try {
                const persistedUser = await this.userRepo.save(newUser);
                resolve(this.removePassword(persistedUser));
            } catch (e) {
                reject(e);
            }

        });

    }

    updateUser(updatedUser: User): Promise<boolean> {
        
        return new Promise<boolean>(async (resolve, reject) => {

            if (!isValidObject(updatedUser)) {
                reject(new BadRequestError('Invalid user provided (invalid values found).'));
                return;
            }

            try {
                // let repo handle some of the other checking since we are still mocking db
                resolve(await this.userRepo.update(updatedUser));
            } catch (e) {
                reject(e);
            }

        });

    }

    deleteById(id: number): Promise<boolean> {
        
        return new Promise<boolean>(async (resolve, reject) => {
            reject(new NotImplementedError());
        });

    }

    private removePassword(user: User): User {
        if(!user || !user.password) return user;
        let usr = {...user};
        delete usr.password;
        return usr;   
    }

}