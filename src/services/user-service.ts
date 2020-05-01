import { User } from "../models/user";
import { UserRepository } from "../repos/user-repo";
import { 
    isValidId, 
    isValidStrings, 
    isValidObject, 
    isPropertyOf, 
    isEmptyObject 
} from "../util/validator";
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";
import { Role } from "../models/role";
import { mapUserEntity } from "../util/dto-mapper";
import { UserDTO } from "../dtos";

export class UserService {

    constructor(private userRepo: UserRepository) {
        console.log('Instantiating UserService...');
        this.userRepo = userRepo;
        console.log('UserService instantiation complete.')
    }

    async getAllUsers(): Promise<UserDTO[]> {

        try {
            
            let users = await this.userRepo.getAll();
            
            if (users.length == 0) {
                throw new ResourceNotFoundError();
            }

            return users.map(mapUserEntity);

        } catch (e) {
            throw e;
        }

    }

    async getUserById(id: number): Promise<UserDTO> {

       try {

            if (!isValidId(id)) {
                throw new BadRequestError();
            }

            let user = {...await this.userRepo.getById(id)};

            if(isEmptyObject(user)) {
                throw new ResourceNotFoundError();
            }

            return mapUserEntity(user);

        } catch (e) {
            throw e;
        }

    }

    async getUserByUniqueKey(queryObj: any): Promise<UserDTO> {

        try {

            let queryKeys = Object.keys(queryObj);
            if(!queryKeys.every(key => isPropertyOf(key, User))) {
                throw new BadRequestError();
            }

            // we will only support single param searches (for now)
            let key = queryKeys[0];
            let val = queryObj[key];

            // if they are searching for a user by id, reuse the logic we already have
            if (key === 'id') {
                return await this.getUserById(+val);
            }

            // ensure that the provided key value is valid
            if(!isValidStrings(val)) {
                throw new BadRequestError();
            }

            let user = {...await this.userRepo.getUserByUniqueKey(key, val)};

            if (isEmptyObject(user)) {
                throw new ResourceNotFoundError();
            }

            return mapUserEntity(user);

        } catch (e) {
            throw e;
        }

    }

    async authenticateUser(un: string, pw: string): Promise<UserDTO> {

        try {
            
            if (!isValidStrings(un, pw)) {
                throw new BadRequestError();
            }
            
            let authUser = await this.userRepo.getUserByCredentials(un, pw);

            if (isEmptyObject(authUser)) {
                throw new AuthenticationError('Bad credentials provided.');
            }

            return mapUserEntity(authUser);

        }  catch (e) {
            throw e;
        }

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

                newUser.role = new Role('User');
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