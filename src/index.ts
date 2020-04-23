import { UserRepository } from './repos/user-repo'
import { PostRepository } from './repos/post-repo'


// let postRepo = new PostRepository();

// let postPromise = postRepo.getAll();

// postPromise.then(console.log).catch(console.log);

(async function(){

    let userRepo = UserRepository.getInstance();

    console.log(userRepo.getAll());

})();
    


