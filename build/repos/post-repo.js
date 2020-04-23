"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_db_1 = __importDefault(require("../data/post-db"));
var errors_1 = require("../errors/errors");
var PostRepository = /** @class */ (function () {
    function PostRepository() {
    }
    PostRepository.prototype.getAll = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var posts = [];
                for (var _i = 0, data_1 = post_db_1.default; _i < data_1.length; _i++) {
                    var post = data_1[_i];
                    posts.push(__assign({}, post));
                }
                if (posts.length === 0) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(posts);
            }, 1000);
        });
    };
    PostRepository.prototype.getById = function (id) {
        return new Promise(function (resolve, reject) {
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var post = __assign({}, post_db_1.default.filter(function (post) { return post.id === id; }).pop());
                if (!post) {
                    reject(new errors_1.ResourceNotFoundError());
                    return;
                }
                resolve(post);
            }, 250);
        });
    };
    PostRepository.prototype.save = function (newPost) {
        return new Promise(function (resolve, reject) {
            reject(new errors_1.NotImplementedError());
        });
    };
    PostRepository.prototype.update = function (updatedPost) {
        return new Promise(function (resolve, reject) {
            reject(new errors_1.NotImplementedError());
        });
    };
    PostRepository.prototype.deleteById = function (id) {
        return new Promise(function (resolve, reject) {
            reject(new errors_1.NotImplementedError());
        });
    };
    PostRepository.prototype.getPostsByPosterId = function (pid) {
        return new Promise(function (resolve, reject) {
            if (typeof pid !== 'number' || !Number.isInteger(pid) || pid <= 0) {
                reject(new errors_1.BadRequestError());
                return;
            }
            setTimeout(function () {
                var posts = post_db_1.default.filter(function (post) { return post.posterId == pid; });
                resolve(posts);
            }, 1000);
        });
    };
    return PostRepository;
}());
exports.PostRepository = PostRepository;
