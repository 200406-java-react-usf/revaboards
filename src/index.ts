import * as express from 'express';
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