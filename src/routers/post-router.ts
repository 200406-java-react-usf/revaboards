import express from 'express';
import { Post } from '../models/post';
import {PostRepository} from '../repos/post-repo';

export const PostRouter = express.Router();
const postRepo = PostRepository.getInstance();

PostRouter.get('/', async (req, res) => {
    try {
        let payload = await postRepo.getAll();
        res.status(200).json(payload).send();
    }catch (e) {
        res.status(404).json(e);
    }
});

PostRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    try {
        let payload = await postRepo.getById(id);
        res.status(200).json(payload).send();
    }catch (e) {
        res.status(404).json(e);
    }
});