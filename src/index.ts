import express from 'express';
import * as bodyparser from 'body-parser';

import { PostRepository } from './repos/post-repo';
import { UserRepository } from './repos/user-repo';

import { UserRouter } from './routers/user-router';

const app = express();
const postRepo = PostRepository.getInstance();

app.use('/', bodyparser.json());

app.use('/users', UserRouter);

// app.get('/posts', async (req, resp) => {

//     try{
//         let payload = await postRepo.getAll();
//         resp.status(200).json(payload).send();
//     } catch (e){
//         resp.status(404).json(e).send();
//     }
// });

app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});