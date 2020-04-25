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

    });

    test('should be a singleton', () => {
        let reference1 = sut.getInstance();
        let reference2 = sut.getInstance();
        expect(reference1).toEqual(reference2);
    });

    test('2. should return all users (without passwords) when getAll is called', async () => {
        
        // Arrange
        expect.assertions(3);

        // Act
        let result = await sut.getInstance().getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].password).toBeUndefined();

    });

    test('3. should return correct user (without password) when getById is given a valid id', async () => {
        
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

    test('5. should return correct user (without password) when getUserByUsername is given a known username', async () => {
        
        // Arrange
        expect.assertions(3);
        Validator.isValidStrings = jest.fn().mockReturnValue(true);

        // Act
        let result = await sut.getInstance().getUserByUsername('aanderson');

        // Assert
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
    
    });

    test('should throw ResourceNotFoundError when getUserByUsername is given an unknown username', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidStrings = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getInstance().getUserByUsername('nobody');
        } catch (e) {

            // Assert
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
        Validator.isValidStrings = jest.fn().mockReturnValue(true);

        // Act
        let result = await sut.getInstance().getUserByCredentials('aanderson', 'password');
        
        // Assert
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
        
    });
    
    test('should throw AuthenticationError when getUserByCredentials is given incorrect credentials', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidStrings = jest.fn().mockReturnValue(true);
        
        // Act
        try {
            await sut.getInstance().getUserByCredentials('aanderson', 'wrong');
        } catch(e) {

            // Assert
            expect(e instanceof AuthenticationError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when getUserByCredentials is given bad data', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidStrings = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().getUserByCredentials('', '');
        } catch(e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should return a user (without password) that has a new id when save is given a valid new user', async () => {
        
        // Arrange
        expect.assertions(3);
        Validator.isValidId = jest.fn().mockReturnValue(true);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        let validMockUser = new User(0, 'test', 'test', 'test', 'test', 'test@revature.com', new Date());
        let result = await sut.getInstance().save(validMockUser);
        
        // Assert
        expect(result).toBeTruthy();
        expect(result.id).toBeGreaterThan(0);
        expect(result.password).toBeUndefined();

    });

    test('should throw ResourcePersistenceError when save is given a new user with a conflicting username', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        
        //Act
        let conflictingMockUser = new User(0, 'aanderson', 'test', 'test', 'test', 'test@revature.com', new Date());
        Validator.isValidId = jest.fn().mockReturnValue(true);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getInstance().save(conflictingMockUser);
        } catch (e) {

            // Assert
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }

    });

    test('should throw ResourcePersistenceError when save is given a new user with a conflicting email', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        //Act
        let conflictingMockUser = new User(0, 'a', 'a', 'a', 'a', 'aanderson@revature.com', new Date());
        Validator.isValidId = jest.fn().mockReturnValue(true);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getInstance().save(conflictingMockUser);
        } catch (e) {

            // Assert
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when save is given an invalid new user (falsy username)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        //Act
        let invalidMockUser = new User(0, '', 'a', 'a', 'a', 'a@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when save is given an invalid new user (falsy password)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        //Act
        let invalidMockUser = new User(0, 'a', '', 'a', 'a', 'a@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        
        // Act
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('16. should throw BadRequestError when save is given an invalid new user (falsy firstName)', async () => {
        
        //Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        //Act
        let invalidMockUser = new User(0, 'a', 'a', '', 'a', 'a@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {

            //Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy lastName)', async () => {    
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        //Act
        let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', '', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when save is given an invalid new user (falsy dob)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        //Act
        let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', 'a@revature.com', null);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        
        // Act
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when save is given a falsy user', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().save(null);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should return true when update is given a valid updated user', async () => {
        
        // Arrange
        expect.assertions(1);
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        Validator.isValidId = jest.fn().mockReturnValue(true);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        let result = await sut.getInstance().update(updatedUser);

        // Assert
        expect(result).toBeTruthy();

    });

    test('should throw ResourceNotFoundError when update is given an updated user with an unknown id', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        //Act
        let updatedUser = new User(999999, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        Validator.isValidId = jest.fn().mockReturnValue(true);
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            console.log(e);
            // Assert
            expect(e instanceof ResourceNotFoundError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when update is given an updated user with an invalid id (decimal)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(false);

        //Act
        let updatedUser = new User(3.14, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when update is given an updated user with an invalid id (negative)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(false);

        //Act
        let updatedUser = new User(-1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            //Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw ResourcePersistenceError when update is given an updated user with an updated username', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        //Act
        let updatedUser = new User(1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }

    });

    test('should throw ResourcePersistenceError when update is given an updated user with a conflicting username', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        //Act
        let updatedUser = new User(1, 'bbailey', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }

    });
    
    test('should throw ResourcePersistenceError when update is given an updated user with a conflicting email', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(true);
        Validator.isValidId = jest.fn().mockReturnValue(true);
        
        //Act
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy username)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        //Act
        let updatedUser = new User(1, '', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy password)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        //Act
        let updatedUser = new User(1, 'aanderson', '', 'updated', 'updated', 'bbailey@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        
        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy firstName)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        //Act
        let updatedUser = new User(1, 'aanderson', 'updated', '', 'updated', 'bbailey@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy lastName)', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        Validator.isValidId = jest.fn().mockReturnValue(true);

        //Act
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', '', 'bbailey@revature.com', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy email)', async () => {
        
        // Arrange
        expect.assertions(1);
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', '', new Date());
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }
        
    });

    test('32. should throw BadRequestError when update is given an invalid updated user (falsy dob)', async () => {

        // Arrange
        expect.assertions(1);
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', null);
        Validator.isValidObject = jest.fn().mockReturnValue(false);
        
        // Act
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when update is given an falsy user', async () => {
        
        // Arrange
        expect.assertions(1);
        Validator.isValidObject = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getInstance().update(null);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

});