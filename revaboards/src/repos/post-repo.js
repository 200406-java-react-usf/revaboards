// implement and export the methods: getPostById and getPostsByPosterId
const postData = require('../data/post-db');
module.exports = (function() {
    
    let instance;
   
    function init() {
        // const getPostById = (id, cb) => {
        //     setTimeout(() => {
        //         if (!id || id <= 0) throw new Error('Oh no! You gave me bad data!');
        //         const post = postData.filter(post => post.id === id).pop();
        //         if (!post) throw new Error('No post found with provided id!');
        //         cb(post);
        //     }, 250);
        // }
        
        function getPostById(id) {
            let called;
            let thunkCb;
            setTimeout(() => {
               
                if (!id || id <= 0){
                    thunkCb ='Oh no! You gave me bad data!';
                }
                const post = postData.filter(post => post.id === id).pop();
                if (!post) {
                    thunkCb =('No post found with provided id!');
                }
                console.log(post)
                thunkCb = post;
                
            }, 250);
            return function(cb) {
                
                if (!called) {
                    called = true;
                    thunkCb = cb
                }
                else{
                    cb(post)
                }
            }
        }

        function getPostsByPosterId(posterId) {
            let called;
            let thunkCb;
            setTimeout(() => {
                //console.log('1')
                if (!posterId || posterId <= 0){
                    thunkCb ='Oh no! You gave me bad data!';
                }

                const posts = postData.filter(post => post.poster == posterId);
                if (posts.length == 0) {
                    thunkCb =('No posts found with provided poster id!');
                }
                else{
                    thunkCb = posts;
                }
            }, 250);
            return function(cb) {
                //console.log('3')
                if (!called) {
                    called = true;
                    thunkCb = cb
                   // console.log('4')
                }
                else{
                   // console.log('5')
                    cb(posts)
                }
            }
        }
        

        function addPost (newPost){
           let called;
           let thunkCb;
            if(!newPost){
                thunkCb = 'Falsy post object provided.'
            }

            setTimeout(() => {
                console.log(postData.length)
                newPost.id = (postData.length) + 1;
                postData.push(newPost);
                console.log(postData.length)
                thunkCb = postData;
        
            }, 250);

            return function(cb) {
                
                if (!called) {
                    called = true;
                    thunkCb = cb
                }
                else{
                    cb(postData)
                }
            }

        }

        return {
            getPostById,
            getPostsByPosterId,
            addPost
        };
    }

    return{
        getInstance: function() {
            return !instance ? instance = init() : instance;
        }
    }
})();