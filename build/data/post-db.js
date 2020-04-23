"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = require("../models/post");
var id = 1;
exports.default = [
    new post_1.Post(id++, 'hello world!', 'This is my first post! Huzzah!', 1),
    new post_1.Post(id++, 'this is cool', 'NodeJS is so awesome! It uses the same JS engine as Google Chrome: V8', 1),
    new post_1.Post(id++, 'no limits', 'NodeJS is a runtime environment that lets JS run outside of the browser!', 2),
    new post_1.Post(id++, 'in the cloud', 'the ability to do run JS outside the browser has made NodeJS popular for "serverless" applications', 3),
    new post_1.Post(id++, 'single-threaded?', 'i\'ve heard that JS is single threaded, is that true?', 4)
];
