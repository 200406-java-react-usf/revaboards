"use strict";
var sut = require('./user-repo');
var User = require('../models/user');
describe('userRepo', function () {
    test('should be a singleton', function () {
        var reference1 = sut.getInstance();
        var reference2 = sut.getInstance();
        expect(reference1).toEqual(reference2);
    });
    test('should return all users, without passwords, when getAllUsers is called', function (done) {
        expect.assertions(3);
        sut.getInstance().getAllUsers(function (err, result) {
            expect(err).toBeFalsy();
            expect(result.length).toBeGreaterThan(0);
            expect(result[0].password).toBeFalsy();
            done();
        });
    });
    test('should return correct user when getUserById is given a valid id', function (done) {
        expect.assertions(3);
        sut.getInstance().getUserById(1, function (err, result) {
            expect(err).toBeFalsy();
            expect(result).toBeTruthy();
            expect(result.id).toBe(1);
            done();
        });
    });
    test('should invoke error callback when getUserById is given an invalid id', function (done) {
        expect.assertions(2);
        sut.getInstance().getUserById(-1, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should return correct user when getUserByUsername is given a known username', function (done) {
        expect.assertions(3);
        sut.getInstance().getUserByUsername('aanderson', function (err, result) {
            expect(err).toBeFalsy();
            expect(result).toBeTruthy();
            expect(result.username).toEqual('aanderson');
            done();
        });
    });
    test('should invoke error callback when getUserByUsername is given an unknown username', function (done) {
        expect.assertions(2);
        sut.getInstance().getUserByUsername('nobody', function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when getUserByUsername is given bad data', function (done) {
        expect.assertions(2);
        sut.getInstance().getUserByUsername('', function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should return correct user when getUserByCredentials is given valid credentials', function (done) {
        expect.assertions(4);
        sut.getInstance().getUserByCredentials('aanderson', 'password', function (err, result) {
            expect(err).toBeFalsy();
            expect(result).toBeTruthy();
            expect(result.username).toEqual('aanderson');
            expect(result.password).toEqual('password');
            done();
        });
    });
    test('should invoke error callback when getUserByCredentials is given invalid credentials', function (done) {
        expect.assertions(2);
        sut.getInstance().getUserByCredentials('aanderson', 'wrong', function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when getUserByCredentials is given bad data', function (done) {
        expect.assertions(2);
        sut.getInstance().getUserByCredentials('', '', function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should add a new user to the datasource when addNewUser is given a valid new user', function (done) {
        var validMockUser = new User(0, 'test', 'test', 'test', 'test', 'test@revature.com', new Date());
        expect.assertions(3);
        sut.getInstance().addNewUser(validMockUser, function (err, result) {
            expect(err).toBeFalsy();
            expect(result).toBeTruthy();
            expect(result.id).toBeGreaterThan(0);
            done();
        }, function () { });
    });
    test('should invoke error callback when addNewUser is given a new user with a conflicting username', function (done) {
        var conflictingMockUser = new User(0, 'aanderson', 'test', 'test', 'test', 'test@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().addNewUser(conflictingMockUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when addNewUser is given a new user with a conflicting username', function (done) {
        var conflictingMockUser = new User(0, 'a', 'a', 'a', 'a', 'aanderson@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().addNewUser(conflictingMockUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when addNewUser is given an invalid new user (falsy username)', function (done) {
        var invalidMockUser = new User(0, '', 'a', 'a', 'a', 'a@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().addNewUser(invalidMockUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when addNewUser is given an invalid new user (falsy password)', function (done) {
        var invalidMockUser = new User(0, 'a', '', 'a', 'a', 'a@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().addNewUser(invalidMockUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when addNewUser is given an invalid new user (falsy firstName)', function (done) {
        var invalidMockUser = new User(0, 'a', 'a', '', 'a', 'a@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().addNewUser(invalidMockUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when addNewUser is given an invalid new user (falsy lastName)', function (done) {
        var invalidMockUser = new User(0, 'a', 'a', 'a', 'a', '', new Date());
        expect.assertions(2);
        sut.getInstance().addNewUser(invalidMockUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when addNewUser is given an invalid new user (falsy dob)', function (done) {
        var invalidMockUser = new User(0, 'a', 'a', 'a', 'a', 'a@revature.com', null);
        expect.assertions(2);
        sut.getInstance().addNewUser(invalidMockUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when when addNewUser is given a falsy user', function (done) {
        expect.assertions(2);
        sut.getInstance().addNewUser(null, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should update user within the datasource when updateUser is given a valid updated user', function (done) {
        var updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeFalsy();
            expect(result).toBeTruthy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an updated user with an updated username', function (done) {
        var updatedUser = new User(1, 'updated', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an updated user with a conflicting username', function (done) {
        var updatedUser = new User(1, 'bbailey', 'updated', 'updated', 'updated', 'updated@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an updated user with a conflicting email', function (done) {
        var updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an invalid updated user (falsy username)', function (done) {
        var updatedUser = new User(1, '', 'updated', 'updated', 'updated', 'bbailey@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an invalid updated user (falsy password)', function (done) {
        var updatedUser = new User(1, 'aanderson', '', 'updated', 'updated', 'bbailey@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an invalid updated user (falsy firstName)', function (done) {
        var updatedUser = new User(1, 'aanderson', 'updated', '', 'updated', 'bbailey@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an invalid updated user (falsy lastName)', function (done) {
        var updatedUser = new User(1, 'aanderson', 'updated', 'updated', '', 'bbailey@revature.com', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an invalid updated user (falsy email)', function (done) {
        var updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', '', new Date());
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an invalid updated user (falsy dob)', function (done) {
        var updatedUser = new User(1, 'aanderson', 'updated', 'updated', 'updated', 'updated@revature.com', null);
        expect.assertions(2);
        sut.getInstance().updateUser(updatedUser, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
    test('should invoke error callback when updateUser is given an falsy user', function (done) {
        expect.assertions(2);
        sut.getInstance().updateUser(null, function (err, result) {
            expect(err).toBeTruthy();
            expect(result).toBeFalsy();
            done();
        });
    });
});
