import { PostRepository } from './repos/post-repo';

let postRepo = PostRepository.getInstance();
let postRepo2 = PostRepository.getInstance();

let postPromise = postRepo.getAll();
console.log(postRepo === postRepo2);

postPromise.then(console.log).catch(console.log);
