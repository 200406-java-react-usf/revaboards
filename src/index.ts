<<<<<<< HEAD

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


=======
import express from 'express';
import bodyparser from 'body-parser';

import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';

const app = express();

app.use('/', bodyparser.json());

app.use('/users', UserRouter);
app.use('/posts', PostRouter);


app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});
>>>>>>> 580f5ca1ac0d37fcbc53370377521200a32b9130
