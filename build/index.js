"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_repo_1 = require("./repos/post-repo");
var postRepo = new post_repo_1.PostRepository();
var postPromise = postRepo.getAll();
postPromise.then(console.log).catch(console.log);
// let userRepo = new UserRepository();
// let userPromise = userRepo.getAll();
// userPromise.then(console.log).catch(console.log);
