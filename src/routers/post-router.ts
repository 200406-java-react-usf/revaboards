import express from 'express';
import { Post } from '../models/post';
import { PostRepository } from '../repos/post-repo';

export const PostRouter = express.Router();

const postRepo = PostRepository.getInstance();

PostRouter.get('/', async (req, resp) => {
    try{
        let payload = await postRepo.getAll();
        resp.status(200).json(payload).send();
    } catch (e){
        resp.status(404).json(e).send();
    }
});

PostRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; //the plus sign is to type coerce id into a number
    try { 
        let payload = await postRepo.getById(id);
        resp.status(200).json(payload).send();
    } catch (e) {
        resp.status(404).json(e).send();
    }
})