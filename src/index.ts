import { UserRepository } from './repos/user-repo'
import { PostRepository } from './repos/post-repo'


let postRepo = new PostRepository();

let postPromise = postRepo.getAll();

postPromise.then(console.log).catch(console.log);

// let userRepo = new UserRepository();

// let userPromise = userRepo.getAll();

// userPromise.then(console.log).catch(console.log);
