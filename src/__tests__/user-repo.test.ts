import { UserRepository as sut } from '../repos/user-repo';
import { User } from '../models/user';
import { BadRequestError, AuthenticationError, ResourceNotFoundError } from '../errors/errors';

describe('userRepo', () => {

    test('should be a singleton', () => {
        let reference1 = sut.getInstance();
        let reference2 = sut.getInstance();
        expect(reference1).toEqual(reference2);
    });

    test('should return all users (without passwords) when getAll is called', async () => {
        expect.assertions(3);
        let result = await sut.getInstance().getAll();
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].password).toBeUndefined();
    });

    test('should return correct user (without password) when getById is given a valid id', async () => {
        expect.assertions(3);
        let result = await sut.getInstance().getById(1);
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.password).toBeUndefined();
    });

    test('should throw BadRequestError when getById is given an invalid id', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getById(-1);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return correct user (without password) when getUserByUsername is given a known username', async () => {
        expect.assertions(3);
        let result = await sut.getInstance().getUserByUsername('aanderson');
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
    
    });

    test('should throw ResourceNotFoundError when getUserByUsername is given an unknown username', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getUserByUsername('nobody');
        } catch (e) {
            expect(e instanceof ResourceNotFoundError).toBeTruthy();
        }
        
    });

    test('should throw BadRequestError when getUserByUsername is given bad data', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getUserByUsername('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return correct user (without password) when getUserByCredentials is given valid credentials', async () => {
        expect.assertions(3);
        let result = await sut.getInstance().getUserByCredentials('aanderson', 'password');
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
        
    });
    
    // Damola
    // test('should invoke error callback when getUserByCredentials is given invalid credentials', done => {
    //     expect.assertions(2);
    //     sut.getInstance().getUserByCredentials('aanderson', 'wrong', (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // Andrew
    // test('should invoke error callback when getUserByCredentials is given bad data', done => {
    //     expect.assertions(2);
    //     sut.getInstance().getUserByCredentials('', '', (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // Jeremiah
    // test('should add a new user to the datasource when addNewUser is given a valid new user', done => {
        
    //     let validMockUser = new User(0, 'test', 'test', 'test', 'test', 'test@revature.com', new Date());
        
    //     expect.assertions(3);
    //     sut.getInstance().addNewUser(validMockUser, (err, result) => {
    //         expect(err).toBeFalsy();
    //         expect(result).toBeTruthy();
    //         expect(result.id).toBeGreaterThan(0);
    //         done();
    //     }, () => {});

    // });

    // Jeremy
    // test('should invoke error callback when addNewUser is given a new user with a conflicting username', done => {
        
    //     let conflictingMockUser = new User(0, 'aanderson', 'test', 'test', 'test', 'test@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(conflictingMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // Dontae
    // test('should invoke error callback when addNewUser is given a new user with a conflicting email', done => {
        
    //     let conflictingMockUser = new User(0, 'a', 'a', 'a', 'a', 'aanderson@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(conflictingMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // Kevin
    // test('should invoke error callback when addNewUser is given an invalid new user (falsy username)', done => {
        
    //     let invalidMockUser = new User(0, '', 'a', 'a', 'a', 'a@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // Hao
    // test('should invoke error callback when addNewUser is given an invalid new user (falsy password)', done => {
        
    //     let invalidMockUser = new User(0, 'a', '', 'a', 'a', 'a@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // John
    // test('should invoke error callback when addNewUser is given an invalid new user (falsy firstName)', done => {
        
    //     let invalidMockUser = new User(0, 'a', 'a', '', 'a', 'a@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // Thomas
    // test('should invoke error callback when addNewUser is given an invalid new user (falsy lastName)', done => {
        
    //     let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', '', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // Scott
    test('should throw error when save (adding new user) is given an invalid new user (falsy dob)', async () => { 
        expect.assertions(1);
        try {
            await sut.getInstance().save(new User(0, 'a', 'a', 'a', 'a', 'a@revature.com', null));
        } catch (e) {
            console.log(e);
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    // Kaneisha
    // test('should invoke error callback when when addNewUser is given a falsy user', done => {
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(null, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });


    // Jose
    // test('should update user within the datasource when updateUser is given a valid updated user', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeFalsy();
    //         expect(result).toBeTruthy();
    //         done();
    //     });

    // });

    // Kennedy
    // test('should invoke error callback when updateUser is given an updated user with an updated username', done => {

    //     let updatedUser = new User(1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // Neftaly
    // test('should invoke error callback when updateUser is given an updated user with a conflicting username', done => {

    //     let updatedUser = new User(1, 'bbailey', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });
    
    // Juan
    // test('should invoke error callback when updateUser is given an updated user with a conflicting email', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });


    // Korey
    // test('should invoke error callback when updateUser is given an invalid updated user (falsy username)', done => {

    //     let updatedUser = new User(1, '', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // Abraham
    // test('should invoke error callback when updateUser is given an invalid updated user (falsy password)', done => {

    //     let updatedUser = new User(1, 'aanderson', '', 'updated', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // Besim
    // test('should invoke error callback when updateUser is given an invalid updated user (falsy firstName)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', '', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // Mohamed
    // test('should invoke error callback when updateUser is given an invalid updated user (falsy lastName)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', '', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // Josef
    // test('should invoke error callback when updateUser is given an invalid updated user (falsy email)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', '', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // Delissa
    // test('should invoke error callback when updateUser is given an invalid updated user (falsy dob)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', null);

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // Louis
    // test('should invoke error callback when updateUser is given an falsy user', done => {
    //     expect.assertions(2);
    //     sut.getInstance().updateUser(null, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

});