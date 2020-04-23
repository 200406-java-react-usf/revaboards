import { PostRepository } from './repos/post-repo';
import { UserRepository } from './repos/user-repo';

<<<<<<< HEAD
let postRepo = new PostRepository();
let userRepo = new UserRepository();

let postPromise = postRepo.getAll();
let userPromise = userRepo.getAll();

postPromise.then(console.log).catch(console.log);
userPromise.then(console.log).catch(console.log)
=======
(async function() {

    let userRepo = UserRepository.getInstance();
    
    console.log(await userRepo.getAll());

})();
>>>>>>> 69097bd6edc11a188725a1bb29c9adb9d792a8c1
