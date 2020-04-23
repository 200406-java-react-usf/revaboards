"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_db_1 = require("../data/post-db");
const errors_1 = require("../errors/errors");
class PostRepository {
    constructor() { }
    static getInstance() {
        return !PostRepository.instance ? PostRepository.instance = new PostRepository() : PostRepository.instance;
    }
    getAll() {
        console.log(post_db_1.default);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let posts = [];
                for (let post of post_db_1.default) {
                    posts.push(Object.assign({}, post));
                }
                if (posts.length == 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(posts);
            });
        });
    }
    getById(id) {
        return new Promise((resolve, reject) => {
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                const post = Object.assign({}, post_db_1.default.filter(post => post.id === id).pop());
                if (!post) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(post);
            }, 5000);
        });
    }
    getPostsByPosterId(posterId) {
        return new Promise((resolve, reject) => {
            if (typeof posterId !== 'number' || !Number.isInteger(posterId) || posterId <= 0) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                const posts = [];
                for (let post of post_db_1.default.filter(post => post.posterId == posterId)) {
                    posts.push(Object.assign({}, post));
                }
                if (posts.length === 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(posts);
            }, 250);
        });
    }
    save(newPost) {
        return new Promise((resolve, reject) => {
            reject('Not implemented');
        });
    }
    update(updatedPost) {
        return new Promise((resolve, reject) => {
            reject('Not implemented');
        });
    }
    deleteById(id) {
        return new Promise((resolve, reject) => {
            reject('Not implemented');
        });
    }
}
exports.PostRepository = PostRepository;
