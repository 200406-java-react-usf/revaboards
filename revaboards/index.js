//const userRepo = require('./src/repos/user-repo');
const postRepo = require('./src/repos/post-repo');
const Post = require('./src/models/post');

// let task1 = postRepo.getInstance().getPostById(1);

// task1(text =>{
//     console.log(text);
// });

// let task2 = postRepo.getInstance().getPostsByPosterId(2);

// task2(text =>{
//     console.log(...text);
// });

let testPost = new Post(1, 'This is a test', 'Testing out the new add posts feature with thunks', 2);
let task3 = postRepo.getInstance().addPost(testPost);

task3(text =>{
    console.log(...text);
});

// userRepo.getInstance().getAllUsers((err, result) => {
//     err && console.log(err);
//     result && console.log(result);
// });