import { UserRepository as sut } from '../repos/user-repo';
import { User } from '../models/user';
<<<<<<< HEAD
import { BadRequestError, ResourceNotFoundError } from '../errors/errors';
=======
import { BadRequestError, AuthenticationError, ResourceNotFoundError, ResourcePersistenceError } from '../errors/errors';
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76

describe('userRepo', () => {

    test('should be a singleton', () => {
        let reference1 = sut.getInstance();
        let reference2 = sut.getInstance();
        expect(reference1).toEqual(reference2);
    });

<<<<<<< HEAD
    test('should return all users, without passwords, when getAll is called', async () => {
=======
    test('should return all users (without passwords) when getAll is called', async () => {
        expect.assertions(3);
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76
        let result = await sut.getInstance().getAll();
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].password).toBeUndefined();
    });

<<<<<<< HEAD
    test('should return correct user when getById is given a valid id', async () => {
=======
    test('should return correct user (without password) when getById is given a valid id', async () => {
        expect.assertions(3);
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76
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

<<<<<<< HEAD
    test('should throw ResourceNotFoundError getById is given an unknown id', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getById(99999);
        } catch (e) {
            expect(e instanceof ResourceNotFoundError).toBeTruthy();
        }
    });

    test('should return correct user when getUserByUsername is given a known username', async () => {
        let result = await sut.getInstance().getUserByUsername('aanderson');
        expect(result).toBeTruthy();
        expect(result.username).toEqual('aanderson');
        expect(result.password).toBeUndefined();
=======
    test('should return correct user (without password) when getUserByUsername is given a known username', async () => {
        expect.assertions(3);
        let result = await sut.getInstance().getUserByUsername('aanderson');
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
    
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76
    });

    test('should throw ResourceNotFoundError when getUserByUsername is given an unknown username', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getUserByUsername('nobody');
        } catch (e) {
            expect(e instanceof ResourceNotFoundError).toBeTruthy();
        }
<<<<<<< HEAD
=======
        
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76
    });

    test('should throw BadRequestError when getUserByUsername is given bad data', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getUserByUsername('');
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

<<<<<<< HEAD
    test('should return correct user when getUserByCredentials is given valid credentials', async () => {
        let result = await sut.getInstance().getUserByCredentials('aanderson', 'password');
        expect(result).toBeTruthy();
        expect(result.username).toEqual('aanderson');
        expect(result.password).toBeUndefined();
    });

    // test('should invoke error callback when getUserByCredentials is given invalid credentials', done => {
    //     expect.assertions(2);
    //     sut.getInstance().getUserByCredentials('aanderson', 'wrong', (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should invoke error callback when getUserByCredentials is given bad data', done => {
    //     expect.assertions(2);
    //     sut.getInstance().getUserByCredentials('', '', (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

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

    // test('should invoke error callback when addNewUser is given a new user with a conflicting username', done => {
        
    //     let conflictingMockUser = new User(0, 'aanderson', 'test', 'test', 'test', 'test@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(conflictingMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when addNewUser is given a new user with a conflicting email', done => {
        
    //     let conflictingMockUser = new User(0, 'a', 'a', 'a', 'a', 'aanderson@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(conflictingMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when addNewUser is given an invalid new user (falsy username)', done => {
        
    //     let invalidMockUser = new User(0, '', 'a', 'a', 'a', 'a@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when addNewUser is given an invalid new user (falsy password)', done => {
        
    //     let invalidMockUser = new User(0, 'a', '', 'a', 'a', 'a@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when addNewUser is given an invalid new user (falsy firstName)', done => {
        
    //     let invalidMockUser = new User(0, 'a', 'a', '', 'a', 'a@revature.com', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when addNewUser is given an invalid new user (falsy lastName)', done => {
        
    //     let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', '', new Date());
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when addNewUser is given an invalid new user (falsy dob)', done => {
        
    //     let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', 'a@revature.com', null);
        
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(invalidMockUser, (err,result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when when addNewUser is given a falsy user', done => {
    //     expect.assertions(2);
    //     sut.getInstance().addNewUser(null, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should update user within the datasource when updateUser is given a valid updated user', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeFalsy();
    //         expect(result).toBeTruthy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when updateUser is given an updated user with an updated username', done => {

    //     let updatedUser = new User(1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should invoke error callback when updateUser is given an updated user with a conflicting username', done => {

    //     let updatedUser = new User(1, 'bbailey', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });
    
    // test('should invoke error callback when updateUser is given an updated user with a conflicting email', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should invoke error callback when updateUser is given an invalid updated user (falsy username)', done => {

    //     let updatedUser = new User(1, '', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when updateUser is given an invalid updated user (falsy password)', done => {

    //     let updatedUser = new User(1, 'aanderson', '', 'updated', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should invoke error callback when updateUser is given an invalid updated user (falsy firstName)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', '', 'updated', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should invoke error callback when updateUser is given an invalid updated user (falsy lastName)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', '', 'bbailey@revature.com', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should invoke error callback when updateUser is given an invalid updated user (falsy email)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', '', new Date());

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });

    // });

    // test('should invoke error callback when updateUser is given an invalid updated user (falsy dob)', done => {

    //     let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', null);

    //     expect.assertions(2);
    //     sut.getInstance().updateUser(updatedUser, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });

    // test('should invoke error callback when updateUser is given an falsy user', done => {
    //     expect.assertions(2);
    //     sut.getInstance().updateUser(null, (err, result) => {
    //         expect(err).toBeTruthy();
    //         expect(result).toBeFalsy();
    //         done();
    //     });
    // });
=======
    test('should return correct user (without password) when getUserByCredentials is given valid credentials', async () => {
        expect.assertions(3);
        let result = await sut.getInstance().getUserByCredentials('aanderson', 'password');
        expect(result).toBeTruthy();
        expect(result.username).toBe('aanderson');
        expect(result.password).toBeUndefined();
        
    });
    
    test('should throw AuthenticationError when getUserByCredentials is given incorrect credentials', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getUserByCredentials('aanderson', 'wrong');
        } catch(e) {
            expect(e instanceof AuthenticationError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when getUserByCredentials is given bad data', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().getUserByCredentials('', '');
        } catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return a user (without password) that has a new id when save is given a valid new user', async () => {
        expect.assertions(3);
        let validMockUser = new User(0, 'test', 'test', 'test', 'test', 'test@revature.com', new Date());
        let result = await sut.getInstance().save(validMockUser);
        expect(result).toBeTruthy();
        expect(result.id).toBeGreaterThan(0);
        expect(result.password).toBeUndefined();
    });

    // Jeremy
    test('should invoke error callback when addNewUser is given a new user with a conflicting username', async () => {
        expect.assertions(1);
        let conflictingMockUser = new User(0, 'aanderson', 'test', 'test', 'test', 'test@revature.com', new Date());
        try {
            await sut.getInstance().save(conflictingMockUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }

    });

    test('should throw ResourcePersistenceError when save is given a new user with a conflicting email', async () => {
        expect.assertions(1);
        let conflictingMockUser = new User(0, 'a', 'a', 'a', 'a', 'aanderson@revature.com', new Date());
        try {
            await sut.getInstance().save(conflictingMockUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }

    });

    test('should throw BadRequestError when save is given an invalid new user (falsy username)', async () => {
        expect.assertions(1);
        let invalidMockUser = new User(0, '', 'a', 'a', 'a', 'a@revature.com', new Date());
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy password)', async () => {
        expect.assertions(1);
        let invalidMockUser = new User(0, 'a', '', 'a', 'a', 'a@revature.com', new Date());
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy firstName)', async () => {
        expect.assertions(1);
        let invalidMockUser = new User(0, 'a', 'a', '', 'a', 'a@revature.com', new Date());
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy lastName)', async () => {    
        expect.assertions(1);
        let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', '', new Date());
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given an invalid new user (falsy dob)', async () => {
        expect.assertions(1);
        let invalidMockUser = new User(0, 'a', 'a', 'a', 'a', 'a@revature.com', null);
        try {
            await sut.getInstance().save(invalidMockUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when save is given a falsy user', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().save(null);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should return true when update is given a valid updated user', async () => {
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        let result = await sut.getInstance().update(updatedUser);
        expect(result).toBeTruthy();
    });

    test('should throw ResourceNotFoundError when update is given an updated user with an unknown id', async () => {
        expect.assertions(1);
        let updatedUser = new User(999999, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourceNotFoundError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an updated user with an invalid id (decimal)', async () => {
        expect.assertions(1);
        let updatedUser = new User(3.14, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an updated user with an invalid id (negative)', async () => {
        expect.assertions(1);
        let updatedUser = new User(-1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw ResourcePersistenceError when update is given an updated user with an updated username', async () => {
        expect.assertions(1);
        let updatedUser = new User(1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });

    test('should throw ResourcePersistenceError when update is given an updated user with a conflicting username', async () => {
        expect.assertions(1);
        let updatedUser = new User(1, 'bbailey', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });
    
    test('should throw ResourcePersistenceError when update is given an updated user with a conflicting email', async () => {
        expect.assertions(1);
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof ResourcePersistenceError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy username)', async () => {
        expect.assertions(1);
        let updatedUser = new User(1, '', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy password)', async () => {
        expect.assertions(1);
        let updatedUser = new User(1, 'aanderson', '', 'updated', 'updated', 'bbailey@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy firstName)', async () => {
        expect.assertions(1);
        let updatedUser = new User(1, 'aanderson', 'updated', '', 'updated', 'bbailey@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy lastName)', async () => {
        expect.assertions(1);
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', '', 'bbailey@revature.com', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy email)', async () => {
        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', '', new Date());
        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an invalid updated user (falsy dob)', async () => {

        let updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', null);

        try {
            await sut.getInstance().update(updatedUser);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });

    test('should throw BadRequestError when update is given an falsy user', async () => {
        expect.assertions(1);
        try {
            await sut.getInstance().update(null);
        } catch (e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    });
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76

});