import { User } from "../models/user";
import { UserRepository } from "../repos/user-repo";
import { isValidId, isValidStrings, isValidObject, isPropertyOf, isEmptyObject } from "../util/validator";
import { BadRequestError, ResourceNotFoundError, NotImplementedError, ResourcePersistenceError, AuthenticationError } from "../errors/errors";
import { query } from "express";

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

            if(isEmptyObject(user)) {
                reject(new ResourceNotFoundError());
                return;
            }

            resolve(this.removePassword(user));

        });

    }

    getUserByUniqueKey(queryObj: any): Promise<User> {

        return new Promise<User>(async (resolve, reject) => {

            try {

                let queryKeys = Object.keys(queryObj);
                if(!queryKeys.every(key => isPropertyOf(key, User))) {
                    return reject(new BadRequestError());
                }

                // we will only support single param searches (for now)
                let key = queryKeys[0];
                let val = queryObj[key];

                // if they are searching for a user by id, reuse the logic we already have
                if (key === 'id') {
                    return resolve(await this.getUserById(+val));
                }

                // ensure that the provided key value is valid
                if(!isValidStrings(val)) {
                    return reject(new BadRequestError());
                }

                let user = {...await this.userRepo.getUserByUniqueKey(key, val)};

                if (isEmptyObject(user)) {
                    return reject(new ResourceNotFoundError());
                }

                return resolve(this.removePassword(user));

            } catch (e) {
                return reject(e);
            }

        });
    }

    authenticateUser(un: string, pw: string): Promise<User> {

        return new Promise<User>(async (resolve, reject) => {

            try {
                if (!isValidStrings(un, pw)) {
                    return reject(new BadRequestError());
                }
                
                let authUser = await this.userRepo.getUserByCredentials(un, pw);

                if (isEmptyObject(authUser)) {
                    return reject(new AuthenticationError('Bad credentials provided.'));
                }

                return resolve(this.removePassword(authUser));

            }  catch (e) {
                return reject(e);
            }

        });

    }

    addNewUser(newUser: User): Promise<User> {
        
        return new Promise<User>(async (resolve, reject) => {

            try {

                if (!isValidObject(newUser, 'id')) {
                    return reject(new BadRequestError('Invalid property values found in provided user.'));
                }

                if (!this.isUsernameAvailable(newUser.username)) {
                    return reject(new ResourcePersistenceError('The provided username or is already taken.'));
                }

                if (!this.isEmailAvailable(newUser.email)) {
                    return reject(new ResourcePersistenceError('The provided email or is already taken.'));
                }

                newUser.role = 'User';
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

    async isUsernameAvailable(username: string): Promise<boolean> {
        let conflict = await this.userRepo.getUserByUniqueKey('username', username);
        return !isEmptyObject(conflict);
    }

    async isEmailAvailable(email: string): Promise<boolean> {
        let conflict = await this.userRepo.getUserByUniqueKey('email', email);
        return !isEmptyObject(conflict);
    }

    private removePassword(user: User): User {
        if(!user || !user.password) return user;
        let usr = {...user};
        delete usr.password;
        return usr;   
    }

}