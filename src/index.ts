<<<<<<< HEAD
import express, { Response } from 'express';
import bodyparser from 'body-parser';

import { PostRepository } from './repos/post-repo';
import { UserRepository } from './repos/user-repo';
import { User } from './models/user';

const app = express();
const userRepo = UserRepository.getInstance();
const postRepo = PostRepository.getInstance();

app.use('/', bodyparser.json());

app.get('/user', async (req, resp) => {
    
    try{
        let payload = await userRepo.getAll();
        resp.status(200).json(payload).send();
    }catch (e) {
        resp.status(404).json(e).send();
    }
})

app.listen(8080, () => {
    console.log('Application running and listening at http://localhost:8080');
    
})
=======
import express from 'express';
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
>>>>>>> 4a760ef137c50d1413401cfb0caffec78978345c
