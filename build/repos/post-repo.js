"use strict";
var data = require('../data/post-db');
var getPostById = function (id, cb) {
    setTimeout(function () {
        if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
            cb(new errorModule.BadRequestError(), null);
            return;
        }
        var post = data.filter(function (post) { return post.id === id; }).pop();
        callback(null, post);
    }, 250);
};
var getPostsByPosterId = function (posterId, callback) {
    setTimeout(function () {
        var posts = data.filter(function (post) { return post.poster == posterId; });
        callback(posts);
    }, 250);
};
module.exports = {
    getPostById: getPostById,
    getPostsByPosterId: getPostsByPosterId
};
