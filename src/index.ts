import { UserRepository }from './repos/user-repo';
import { PostRepository } from './repos/post-repo';

(async function() {
	let postRepo = PostRepository.getInstance();
	let userRepo = UserRepository.getInstance();

	console.log(await postRepo.getAll());

	console.log(await userRepo.getAll());
})();
