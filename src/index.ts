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
