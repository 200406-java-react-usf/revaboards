import express from 'express';
import bodyParser from 'body-parser';
import {UserRouter} from './routers/user-router';
import {PostRouter} from './routers/post-router';
import { PostRepository } from './repos/post-repo';
import { UserRepository } from './repos/user-repo';

const app = express ();
app.use('/', bodyParser.json());
app.use('/users', UserRouter);
app.use('/posts', PostRouter);
// const userRepo = UserRepository.getInstance();
// const postRepo = UserRepository.getInstance();

// app.get('/users', async (req, res) => {
//     try{
//         let payload = await userRepo.getAll();
//         res.status(200).json(payload).send();
//     }catch(e){
//         res.status(404).json(e);
//     }
// });

// app.get('/posts', async (req, res) => {
//     try{
//         let payload = await postRepo.getAll();
//         res.status(200).json(payload).send();
//     }catch(e){
//         res.status(404).json(e);
//     }
// });

app.listen(8080, () => {
    console.log("Running and listening at port 8080");
});
