const data = require('../data/post-db');

const getPostById = function(id, cb) {
    
    setTimeout(function() {

        if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
            cb(new errorModule.BadRequestError(), null);
            return;
        }

        const post = data.filter(post => post.id === id).pop();

        callback(null, post);
        
    }, 250);
}

const getPostsByPosterId = function(posterId, callback) {
    setTimeout(function() {
        const posts = data.filter(post => post.poster == posterId);
        callback(posts);
    }, 250);
}

module.exports = {
    getPostById,
    getPostsByPosterId
};