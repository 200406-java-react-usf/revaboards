import { UserRepository } from "../repos/user-repo";
import { PostRepository } from "../repos/post-repo";

import { UserService } from "../services/user-service";
import { PostService } from "../services/post-service";
import { Pool } from "pg";

const connectionPool: Pool = new Pool({
    host: 'java-react-200406.c0nbqj7oncuf.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'revaboards',
    user: 'revaboards_api',
    password: 'revature',
    max: 5
});

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

const postRepo = new PostRepository();
const postService = new PostService(postRepo);

export default {
    ConnectionPool: connectionPool,
    UserService: userService,
    PostService: postService
}