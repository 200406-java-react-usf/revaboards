import { PostRepository } from "../repos/post-repo";

export class PostService {

    constructor(private postRepo: PostRepository) {
        this.postRepo = postRepo;
    }

    // TODO implement service methods

}