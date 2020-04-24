import express from 'express';
import * as bodyparser from 'body-parser';

import { PostRepository } from './repos/post-repo';
import { UserRepository } from './repos/user-repo';

import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';

const app = express();
const postRepo = PostRepository.getInstance();

app.use('/', bodyparser.json());

app.use('/users', UserRouter);
app.use('/posts', PostRouter);

app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});