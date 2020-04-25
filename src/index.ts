<<<<<<< HEAD
import express from 'express';
import * as bodyparser from 'body-parser';

import { UserRepository } from './repos/user-repo';
import { PostRepository } from './repos/post-repo';

const app = express();
const userRepo = UserRepository.getInstance();
const postRepo = PostRepository.getInstance();

app.use('/', bodyparser.json());

app.get('/users', async (req: express.Request, resp: express.Response) => {
    try {
        let payload = await userRepo.getAll();
        resp.json(payload).send();
    } catch (e) {
        resp.status(400).send(JSON.stringify(e));
    }
});

app.get('/posts', async (req: express.Request, resp: express.Response) => {
    try {
        let payload = await postRepo.getAll();
        resp.json(payload).send();
    } catch (e) {
        resp.status(400).send(JSON.stringify(e));
    }
});

app.listen(8080, () => {
    console.log('Application running and listening at: http://localhost:8080');
})
=======
import bodyparser from 'body-parser';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';

const app = express();

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

app.use('/', bodyparser.json());


app.use('/users', UserRouter);
app.use('/posts', PostRouter);


app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});
>>>>>>> 1c2f2f555b88c521243348d791927c6627ded4bf
