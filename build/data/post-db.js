"use strict";
var Post = require('../models/post');
var id = 1;
module.exports = [
    new Post(id++, 'hello world!', 'This is my first post! Huzzah!', 1),
    new Post(id++, 'this is cool', 'NodeJS is so awesome! It uses the same JS engine as Google Chrome: V8', 1),
    new Post(id++, 'no limits', 'NodeJS is a runtime environment that lets JS run outside of the browser!', 2),
    new Post(id++, 'in the cloud', 'the ability to do run JS outside the browser has made NodeJS popular for "serverless" applications', 3),
    new Post(id++, 'single-threaded?', 'i\'ve heard that JS is single threaded, is that true?', 4)
];
