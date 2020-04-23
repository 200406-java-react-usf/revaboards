"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_1 = require("./user-repo");
const errors_1 = require("../errors/errors");
describe('userRepo', () => {
    test('should be a singleton', () => {
        let reference1 = user_repo_1.UserRepository.getInstance();
        let reference2 = user_repo_1.UserRepository.getInstance();
        expect(reference1).toEqual(reference2);
    });
    test('should return all users, without passwords, when getAll is called', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield user_repo_1.UserRepository.getInstance().getAll();
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].password).toBeUndefined();
    }));
    test('should return correct user when getById is given a valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield user_repo_1.UserRepository.getInstance().getById(1);
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.password).toBeUndefined();
    }));
    test('should throw BadRequestError when getById is given an invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_repo_1.UserRepository.getInstance().getById(-1);
        }
        catch (e) {
            expect(e instanceof errors_1.BadRequestError).toBeTruthy();
        }
    }));
    test('should throw ResourceNotFound error getById is given an unknown id', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_repo_1.UserRepository.getInstance().getById(99999);
        }
        catch (e) {
            expect(e instanceof errors_1.ResourceNotFoundError).toBeTruthy();
        }
    }));
    test('should return correct user when getUserByUsername is given a known username', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield user_repo_1.UserRepository.getInstance().getUserByUsername('aanderson');
        expect(result).toBeTruthy();
        expect(result.username).toEqual('aanderson');
        expect(result.password).toBeUndefined();
    }));
    test('should throw ResourceNotFoundError when getUserByUsername is given an unknown username', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            user_repo_1.UserRepository.getInstance().getUserByUsername('nobody');
        }
        catch (e) {
            expect(e instanceof errors_1.ResourceNotFoundError).toBeTruthy();
        }
    }));
    test('should throw BadRequestError when getUserByUsername is given bad data', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_repo_1.UserRepository.getInstance().getUserByUsername('');
        }
        catch (e) {
            expect(e instanceof errors_1.BadRequestError).toBeTruthy();
        }
    }));
});
