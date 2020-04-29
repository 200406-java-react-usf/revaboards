import express from 'express';
<<<<<<< HEAD
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
=======
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';
import { AuthRouter } from './routers/auth-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';

const app = express();

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

app.use('/', express.json());
app.use(sessionMiddleware);
app.use(corsFilter);


app.use('/users', UserRouter);
app.use('/posts', PostRouter);
app.use('/auth', AuthRouter);


app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});
>>>>>>> master
