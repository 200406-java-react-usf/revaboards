
import express from 'express';

import { PostRepository } from './repos/post-repo';
import { UserRepository } from './repos/user-repo';


const app = express();

const userRepo = UserRepository.getInstance();
const postRepo = PostRepository.getInstance();


app.get('/users', async (req, resp)=>{
    try{
    let payload = await userRepo.getAll();
    resp.status(200).json(payload).send();
    }catch (e){
        resp.status(404).json(e)
    }
})    
    

app.get('/posts', async (req,resp)=>{
    
    try{let payload = await userRepo.getAll();
    resp.status(200).json(payload).send
    }catch(e){
    resp.status(404).json(e);}
})


app.listen(8080, ()=>{
    console.log("running and listening on port 8080")

})


