<<<<<<< HEAD
import { UserRepository as sut } from '../repos/user-repo';
import { User } from '../models/user';
import Validator from '../util/validator';
import { 
    BadRequestError, 
    AuthenticationError, 
    ResourceNotFoundError, 
    ResourcePersistenceError 
} from '../errors/errors';

describe('userRepo', () => {

    // Set up external functions to throw errors by default (tests will configure if needed)
    beforeEach(() => {

        Validator.isValidId = jest.fn().mockImplementation(() => {
            throw new Error('Failed to mock external method: isValidId!');
        });

        Validator.isValidStrings = jest.fn().mockImplementation(() => {
            throw new Error('Failed to mock external method: isValidStrings!');
        });

        Validator.isValidObject = jest.fn().mockImplementation(() => {
            throw new Error('Failed to mock external method: isValidObject!');
        });

    })

    test('should be a singleton', () => {

        // Arrange
        expect.assertions(1);

        // Act
        let reference1 = sut.getInstance();
        let reference2 = sut.getInstance();

        // Assert
        expect(reference1).toEqual(reference2);

    });

    test('should return all users (without passwords) when getAll is called', async () => {
        
        // Arrange
        expect.assertions(3);

        // Act
        let result = await sut.getInstance().getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].password).toBeUndefined();

    });

    test('should return correct user (without password) when getById is given a valid id', async () => {
        
        // Arrange
        expect.assertions(3);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        // Act
        let result = await sut.getInstance().getById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.password).toBeUndefined();

    });

    test('should throw BadRequestError when getById is given an invalid id', async () => {

        // Arrange
        expect.assertions(1);
        Validator.isValidId = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().getById(-1);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return correct user (without password) when getUserByUsername is given a known username', async () => {
        
        // Arrange
        expect.assertions(3);
        Validator.isValidStrings = jest.fn().mockReturnValue(true)

        // Act
        let result = await sut.getInstance().getUserByUsername('aanderson');

        // Assert
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
    
    });

    test('should throw ResourceNotFoundError when getUserByUsername is given an unknown username', async () => {
        
        expect.assertions(1);
        Validator.isValidStrings = jest.fn().mockReturnValue(true);

        try {
            await sut.getInstance().getUserByUsername('nobody');
        } catch (e) {
            expect(e instanceof ResourceNotFoundError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when getUserByUsername is given bad data', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidStrings = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().getUserByUsername('');
        } catch (e) {

        // Assert
        expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return correct user (without password) when getUserByCredentials is given valid credentials', async () => {
        
        // Arrange
        expect.assertions(3);
        Validator.isValidStrings = jest.fn().mockReturnValue(true)

        // Act
        let result = await sut.getInstance().getUserByCredentials('aanderson','password');

        // Assert
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
    });
    
    test('should throw AuthenticationError when getUserByCredentials is given incorrect credentials', async () => {
        
        expect.assertions(1);
        Validator.isValidStrings = jest.fn().mockReturnValue(true);

        try {
            await sut.getInstance().getUserByCredentials('aanderson', 'wrong');
        } catch (e) {
            expect(e instanceof AuthenticationError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when getUserByCredentials is given bad data', async () => {
        
        expect.assertions(1);
        Validator.isValidStrings = jest.fn().mockReturnValue(false);

        try {
            await sut.getInstance().getUserByCredentials('','');
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return a user (without password) that has a new id when save is given a valid new user', async () => {
        
        expect.assertions(3);
        Validator.isValidObject = jest.fn().mockReturnValue(true)

        let validMockUser = new User(0, 'test', 'test', 'test', 'test', 'test@revature.com', new Date());
        let result = await sut.getInstance().save(validMockUser);

        expect(result).toBeTruthy();
        expect(result.id).toBeGreaterThan(0);
        expect(result.password).toBeUndefined();
    });

    test('should invoke error callback when addNewUser is given a new user with a conflicting username', async () => {
        
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        let conflictingMockUser = new User(0, 'aanderson', 'test', 'test', 'test', 'test@revature.com', new Date());

        try {
            await sut.getInstance().save(conflictingMockUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });

    test('should throw ResourcePersistenceError when save is given a new user with a conflicting email', async () => {
        
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        let conflictingMockUser = new User(0, 'a', 'a', 'a', 'a', 'aanderson@revature.com', new Date());
        
        try {
            await sut.getInstance().save(conflictingMockUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy username)', async () => {
        
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        
        let invalidMockUser = new User(0, '', 'a', 'a', 'a', 'a@revature.com', new Date());
        
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy password)', async () => {
        
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        let invalidMockUser = new User(0, 'a', '', 'a', 'a', 'a@revature.com', new Date());
        
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy firstName)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        let invalidMockUser = new User(0, 'a', 'a', '', 'a', 'a@revature.com', new Date());

        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy lastName)', async () => {    
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', '', new Date());

        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy dob)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', 'a@revature.com', null);

        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given a falsy user', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        try {
            await sut.getInstance().save(null);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return true when update is given a valid updated user', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        let result = await sut.getInstance().update(updatedUser);
        
        expect(result).toBeTruthy();
    });

    test('should throw ResourceNotFoundError when update is given an updated user with an unknown id', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        let updatedUser = new User(999999, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourceNotFoundError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an updated user with an invalid id (decimal)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(false);

        let updatedUser = new User(3.14, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an updated user with an invalid id (negative)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        let updatedUser = new User(-1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw ResourcePersistenceError when update is given an updated user with an updated username', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });

    test('should throw ResourcePersistenceError when update is given an updated user with a conflicting username', async () => {
        expect.assertions(1);
        Validator.isValidId = jest.fn().mockReturnValue(true);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'bbailey', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });
    
    test('should throw ResourcePersistenceError when update is given an updated user with a conflicting email', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);
        
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy username)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidStrings = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, '', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy password)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId= jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'aanderson', '', 'updated', 'updated', 'bbailey@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy firstName)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'aanderson', 'updated', '', 'updated', 'bbailey@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy lastName)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', '', 'bbailey@revature.com', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy email)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', '', new Date());
        
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy dob)', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', null);

        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an falsy user', async () => {
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);
        
        try {
            await sut.getInstance().update(null);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

});
=======
import { UserRepository } from '../repos/user-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { User } from '../models/user';

/*
    We need to mock the connectionPool exported from the main module
    of our application. At this time, we only use one exposed method
    of the pg Pool API: connect. So we will provide a mock function 
    in its place so that we can mock it in our tests.
*/
jest.mock('..', () => {
    return {
        connectionPool: {
            connect: jest.fn()
        }
    }
});

// The result-set-mapper module also needs to be mocked
jest.mock('../util/result-set-mapper', () => {
    return {
        mapUserResultSet: jest.fn()
    }
});

describe('userRepo', () => {

    let sut = new UserRepository();
    let mockConnect = mockIndex.connectionPool.connect;

    beforeEach(() => {

        /*
            We can provide a successful retrieval as the default mock implementation
            since it is very verbose. We can provide alternative implementations for
            the query and release methods in specific tests if needed.
        */
        (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return {
                        rows: [
                            {
                                id: 1,
                                username: 'aanderson',
                                password: 'password',
                                first_name: 'Alice',
                                last_name: 'Anderson',
                                email: 'aanderson@revature.com',
                                role_id: 1
                            }
                        ]
                    }
                }), 
                release: jest.fn()
            }
        });
        (mockMapper.mapUserResultSet as jest.Mock).mockClear();
    });

    test('should resolve to an array of Users when getAll retrieves records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'fn', 'ln', 'email', 'locked');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('should resolve to an empty array when getAll retrieves no records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(0);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('should resolve to a User object when getById retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'un', 'pw', 'fn', 'ln', 'email', 'locked');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.getById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBe(true);

    });

});
>>>>>>> 6a96c6c448d8f4793d235ae1bdb72defe95cfdd6
